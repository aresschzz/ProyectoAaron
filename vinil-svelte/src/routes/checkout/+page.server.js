import { fail, redirect, error } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { Op } from 'sequelize';
import Orden from '$lib/server/models/Orden.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Direccion from '$lib/server/models/Direccion.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Usuario from '$lib/server/models/Usuario.js';
import { fail, redirect, isRedirect } from '@sveltejs/kit';




export async function load({ cookies, url }) {
  const usuarioId = Number(cookies.get('usuario_id'));
  if (!usuarioId) throw redirect(302, '/login');

  const idsParam = url.searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',').map(Number) : [];

  try {
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [{ model: Direccion, as: 'direccion' }]
    });

    const vinilos = await Vinilo.findAll({
      where: { id_vinilo: ids, disponible: true },
      include: [
        {
          model: Catalogo_Vinilo,
          as: "catalogo_vinilo",
          include: [
            {
              model: Artista,
              as: "artista"
            }
          ]
        }
      ]
    });

    return {
      direccion: usuario?.direccion?.toJSON() ?? null,
      items: vinilos.map(v => v.toJSON()) 
    };

  } catch {
    return { direccion: null, items: [] };
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const usuarioId = cookies.get('usuario_id');
    if (!usuarioId) return fail(401, { error: 'No autenticado' });

    const data = await request.formData();
    const itemsRaw = data.get('items');

    let items;
    try {
      items = JSON.parse(itemsRaw);
    } catch {
      return fail(400, { error: 'Carrito inválido' });
    }

    if (!items || items.length === 0) {
      return fail(400, { error: 'El carrito está vacío' });
    }

    const t = await db.transaction();
    try {
      const vinilos = await Vinilo.findAll({
        where: { id_vinilo: items.map(i => i.id_vinilo), disponible: true },
        transaction: t
      });

      if (vinilos.length !== items.length) {
        await t.rollback();
        return fail(409, { error: 'Uno o más vinilos ya no están disponibles' });
      }

      const total = vinilos.reduce((sum, v) => sum + parseFloat(v.precio_venta), 0);

      const orden = await Orden.create(
        { id_usuario: usuarioId, fecha: new Date(), total },
        { transaction: t }
      );

      for (const vinilo of vinilos) {
        await Detalle_Orden.create(
          { id_orden: orden.id_orden, id_vinilo: vinilo.id_vinilo, precio: vinilo.precio_venta },
          { transaction: t }
        );
        await vinilo.update({ disponible: false }, { transaction: t });
      }

      await t.commit();
      throw redirect(302, `/confirmacion?orden=${orden.id_orden}`);
    } catch (err) {
      if (isRedirect(err)) throw err;
      if (!t.finished) await t.rollback();
      return fail(500, { error: 'Error al procesar la orden' });
    }
  }
};

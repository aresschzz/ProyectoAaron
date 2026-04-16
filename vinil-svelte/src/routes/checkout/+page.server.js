import { fail, redirect, error } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import { Op } from 'sequelize';
import Orden from '$lib/server/models/Orden.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Direccion from '$lib/server/models/Direccion.js';

export async function load({ cookies }) {
  const usuarioId = cookies.get('usuario_id');
  if (!usuarioId) throw redirect(302, '/login');

  try {
    const direccion = await Direccion.findOne({ where: { id_usuario: usuarioId } });
    return { direccion: direccion ? direccion.toJSON() : null };
  } catch {
    return { direccion: null };
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
      redirect(302, `/confirmacion?orden=${orden.id_orden}`);
    } catch (err) {
      await t.rollback();
      console.error('Error al crear orden:', err);
      return fail(500, { error: 'No se pudo procesar el pedido' });
    }
  }
};

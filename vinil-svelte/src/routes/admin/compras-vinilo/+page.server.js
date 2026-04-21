import { fail } from '@sveltejs/kit';
import db from '$lib/server/db.js';
import Compra_Vinilo from '$lib/server/models/Compra_Vinilo.js';
import Detalle_Compra from '$lib/server/models/Detalle_Compra.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Genero from '$lib/server/models/Genero.js';
import Empresa from '$lib/server/models/Empresa.js';
import Estado_Vinilo from '$lib/server/models/Estado_Vinilo.js';
import Usuario from '$lib/server/models/Usuario.js';

export async function load() {
  try {
    const [compras, artistas, generos, empresas, estadosVinilo] = await Promise.all([
      Compra_Vinilo.findAll({
        include: [
          {
            model: Usuario,
            attributes: ['nombre', 'apellido_pa']
          },
          {
            model: Detalle_Compra,
            include: [
              {
                model: Vinilo,
                include: [{ model: Catalogo_Vinilo, include: [{ model: Artista }] }]
              }
            ]
          }
        ],
        order: [['id_compra_vinilo', 'DESC']]
      }),
      Artista.findAll(),
      Genero.findAll(),
      Empresa.findAll(),
      Estado_Vinilo.findAll()
    ]);

    return {
      compras: compras.map(c => c.toJSON()),
      artistas: artistas.map(a => a.toJSON()),
      generos: generos.map(g => g.toJSON()),
      empresas: empresas.map(e => e.toJSON()),
      estadosVinilo: estadosVinilo.map(e => e.toJSON())
    };
  } catch (err) {
    console.error('Error al cargar compras de vinilo:', err);
    return { compras: [], artistas: [], generos: [], empresas: [], estadosVinilo: [] };
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const usuarioId = cookies.get('usuario_id');
      if (!usuarioId) {
        throw redirect(302, '/login'); // 🔥 IMPORTANTE
    }
    const data = await request.formData();

    const albumNombre    = data.get('album')?.toString().trim();
    const artistaNombre  = data.get('artista')?.toString().trim();
    const idGenero       = data.get('id_genero');
    const idEmpresa      = data.get('id_empresa');
    const idEstadoVinilo = data.get('id_estado_vinilo');
    const precioCompra   = data.get('precio_compra');
    const precioVenta    = data.get('precio_venta');

    if (!albumNombre || !artistaNombre || !precioCompra || !precioVenta) {
      return fail(400, { error: 'Completa todos los campos obligatorios' });
    }

    const t = await db.transaction();
    try {
      const [artista] = await Artista.findOrCreate({
        where: { nombre: artistaNombre },
        transaction: t
      });

      const catalogo = await Catalogo_Vinilo.create({
        nombre_albums: albumNombre,
        id_artista: artista.id_artista,
        id_genero: idGenero || null,
        id_empresa: idEmpresa || null
      }, { transaction: t });

      const vinilo = await Vinilo.create({
        id_catalogo: catalogo.id_catalogo_vinilo,
        id_estado_vinilo: idEstadoVinilo || null,
        precio_compra: precioCompra,
        precio_venta: precioVenta,
        disponible: true
      }, { transaction: t });

      const compra = await Compra_Vinilo.create({
        id_usuario: usuarioId
      }, { transaction: t });

      await Detalle_Compra.create({
        id_compra: compra.id_compra_vinilo,
        id_vinilo: vinilo.id_vinilo,
        id_estado_vinilo: idEstadoVinilo || null,
        precio_compra: precioCompra,
        estado: 'registrado'
      }, { transaction: t });

      await t.commit();
      return { success: true };
    } catch (err) {
      await t.rollback();
      console.error('Error al registrar compra:', err);
      return fail(500, { error: 'No se pudo registrar la compra' });
    }
  }
};

import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';
import db from '$lib/server/db.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Orden from '$lib/server/models/Orden.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Detalle_Compra from '$lib/server/models/Detalle_Compra.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Genero from '$lib/server/models/Genero.js';

export async function load({ url }) {
  try {
    const desde = url.searchParams.get('desde');
    const hasta = url.searchParams.get('hasta');

    const filtroFecha = {};
    if (desde) filtroFecha[Op.gte] = new Date(desde);
    if (hasta) filtroFecha[Op.lte] = new Date(hasta + 'T23:59:59');

    const whereOrden = Object.keys(filtroFecha).length ? { fecha: filtroFecha } : {};

    const [
      totalVinilosInventario,
      vinilosVendidos,
      vinilosComprados,
      masVendidos,
      masComprados,
      ventasPorGenero,
      ingresosTotales,
      costosTotales
    ] = await Promise.all([
      Vinilo.count({ where: { disponible: true } }),

      Detalle_Orden.count({
        include: [{ model: Orden, where: whereOrden, required: true }]
      }),

      Detalle_Compra.count(),

      Detalle_Orden.findAll({
        attributes: [
          'id_vinilo',
          [db.fn('COUNT', db.col('detalle_orden.id_vinilo')), 'total_vendidos']
        ],
        include: [
          { model: Orden, where: whereOrden, required: true, attributes: [] },
          {
            model: Vinilo, attributes: [],
            include: [{ model: Catalogo_Vinilo, attributes: ['nombre_albums'], include: [{ model: Artista, attributes: ['nombre'] }] }]
          }
        ],
        group: [
          'detalle_orden.id_vinilo',
          'vinilo.id_vinilo',
          'vinilo->catalogo_vinilo.id_catalogo_vinilo',
          'vinilo->catalogo_vinilo.nombre_albums',
          'vinilo->catalogo_vinilo->artista.id_artista',
          'vinilo->catalogo_vinilo->artista.nombre'
        ],
        order: [[db.literal('total_vendidos'), 'DESC']],
        limit: 5
      }),

      Detalle_Compra.findAll({
        attributes: [
          'id_vinilo',
          [db.fn('COUNT', db.col('detalle_compra.id_vinilo')), 'total_comprados']
        ],
        include: [
          {
            model: Vinilo, attributes: [],
            include: [{ model: Catalogo_Vinilo, attributes: ['nombre_albums'], include: [{ model: Artista, attributes: ['nombre'] }] }]
          }
        ],
        group: [
          'detalle_compra.id_vinilo',
          'vinilo.id_vinilo',
          'vinilo->catalogo_vinilo.id_catalogo_vinilo',
          'vinilo->catalogo_vinilo.nombre_albums',
          'vinilo->catalogo_vinilo->artista.id_artista',
          'vinilo->catalogo_vinilo->artista.nombre'
        ],
        order: [[db.literal('total_comprados'), 'DESC']],
        limit: 5
      }),

      Detalle_Orden.findAll({
        attributes: [[db.fn('COUNT', db.col('detalle_orden.id_detalle_o')), 'total']],
        include: [
          { model: Orden, where: whereOrden, required: true, attributes: [] },
          {
            model: Vinilo, attributes: [],
            include: [{ model: Catalogo_Vinilo, attributes: [], include: [{ model: Genero, attributes: ['nombre'] }] }]
          }
        ],
        group: [
          'vinilo->catalogo_vinilo->genero.id_genero',
          'vinilo->catalogo_vinilo->genero.nombre'
        ],
        order: [[db.literal('total'), 'DESC']]
      }),

      Orden.findAll({
        where: whereOrden,
        attributes: [[db.fn('SUM', db.col('total')), 'suma']]
      }),

      Detalle_Compra.findAll({
        attributes: [[db.fn('SUM', db.col('precio_compra')), 'suma']]
      })
    ]);

    const ingresos = parseFloat(ingresosTotales[0]?.dataValues?.suma || 0);
    const costos   = parseFloat(costosTotales[0]?.dataValues?.suma || 0);

    return {
      stats: {
        totalVinilosInventario,
        vinilosVendidos,
        vinilosComprados,
        ingresosTotales: ingresos.toFixed(2),
        costosTotales: costos.toFixed(2),
        gananciaNeta: (ingresos - costos).toFixed(2)
      },
      masVendidos: masVendidos.map(d => ({
        nombre: d.vinilo?.catalogo_vinilo?.nombre_albums ?? 'Desconocido',
        artista: d.vinilo?.catalogo_vinilo?.artista?.nombre ?? '—',
        total: parseInt(d.dataValues.total_vendidos)
      })),
      masComprados: masComprados.map(d => ({
        nombre: d.vinilo?.catalogo_vinilo?.nombre_albums ?? 'Desconocido',
        artista: d.vinilo?.catalogo_vinilo?.artista?.nombre ?? '—',
        total: parseInt(d.dataValues.total_comprados)
      })),
      ventasPorGenero: ventasPorGenero.map(d => ({
        genero: d.vinilo?.catalogo_vinilo?.genero?.nombre ?? 'Sin género',
        total: parseInt(d.dataValues.total)
      })),
      filtros: { desde, hasta }
    };
  } catch (err) {
    console.error('Error al cargar reportes:', err);
    throw error(500, 'Error al generar los reportes');
  }
}

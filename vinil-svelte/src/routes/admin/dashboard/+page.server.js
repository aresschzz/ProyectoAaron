import { error } from '@sveltejs/kit';
import { Op } from 'sequelize';
import db from '$lib/server/db.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Orden from '$lib/server/models/Orden.js';
import Compra_Vinilo from '$lib/server/models/Compra_Vinilo.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Detalle_Compra from '$lib/server/models/Detalle_Compra.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Usuario from '$lib/server/models/Usuario.js';

export async function load() {
  try {
    const inicioMes = new Date();
    inicioMes.setDate(1);
    inicioMes.setHours(0, 0, 0, 0);

    const [totalVinilos, totalCompras, ventasMes, ultimasOrdenes, ultimasCompras] = await Promise.all([
      Vinilo.count(),
      Compra_Vinilo.count(),
      Orden.findAll({
        where: { fecha: { [Op.gte]: inicioMes } },
        attributes: ['total']
      }),
      Orden.findAll({
        limit: 5,
        order: [['fecha', 'DESC']],
        include: [
          { model: Usuario, attributes: ['nombre', 'apellido_pa'] },
          {
            model: Detalle_Orden,
            include: [
              { model: Vinilo, include: [{ model: Catalogo_Vinilo, include: [{ model: Artista }] }] }
            ]
          }
        ]
      }),
      Compra_Vinilo.findAll({
        limit: 5,
        order: [['id_compra_vinilo', 'DESC']],
        include: [
          { model: Usuario, attributes: ['nombre', 'apellido_pa'] },
          {
            model: Detalle_Compra,
            include: [
              { model: Vinilo, include: [{ model: Catalogo_Vinilo, include: [{ model: Artista }] }] }
            ]
          }
        ]
      })
    ]);

    const ingresosMes = ventasMes.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

    const costosTotales = await Detalle_Compra.findAll({
      attributes: [[db.fn('SUM', db.col('precio_compra')), 'suma']]
    });
    const costos = parseFloat(costosTotales[0]?.dataValues?.suma || 0);
    const gananciaEstimada = ingresosMes - costos;

    const movimientosVentas = ultimasOrdenes.map(o => ({
      tipo: 'Venta',
      descripcion: o.detalle_ordens?.[0]?.vinilo?.catalogo_vinilo?.nombre_albums ?? 'Orden',
      usuario: o.usuario ? `${o.usuario.nombre} ${o.usuario.apellido_pa}` : 'Cliente',
      fecha: o.fecha,
      badge: 'success',
      badgeTexto: 'Pagado'
    }));

    const movimientosCompras = ultimasCompras.map(c => ({
      tipo: 'Compra',
      descripcion: c.detalle_compras?.[0]?.vinilo?.catalogo_vinilo?.nombre_albums ?? 'Vinilo',
      usuario: c.usuario ? `${c.usuario.nombre} ${c.usuario.apellido_pa}` : 'Proveedor',
      fecha: new Date(),
      badge: 'warning',
      badgeTexto: 'En revisión'
    }));

    const movimientos = [...movimientosVentas, ...movimientosCompras]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 8);

    return {
      stats: {
        totalVinilos,
        totalCompras,
        ventasMes: ventasMes.length,
        ingresosMes: ingresosMes.toFixed(2),
        gananciaEstimada: gananciaEstimada.toFixed(2)
      },
      movimientos
    };
  } catch (err) {
    console.error('Error al cargar dashboard:', err);
    throw error(500, 'Error al cargar el panel de administración');
  }
}

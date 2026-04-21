import { fail } from '@sveltejs/kit';
import Pedido from '$lib/server/models/Pedido.js';
import Detalle_Pedido from '$lib/server/models/Detalle_Pedido.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';

export async function load({ locals }) {
  try {
    const user = locals.user;

    if (!user) {
      return { pedidos: [] };
    }

    const pedidosDB = await Pedido.findAll({
      where: { id_cliente: user.id_cliente },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Detalle_Pedido,
          include: [
            {
              model: Vinilo,
              include: [
                {
                  model: Catalogo_Vinilo,
                  include: [Artista]
                }
              ]
            }
          ]
        }
      ]
    });

    // Transformar datos para la vista
    const pedidos = pedidosDB.map(p => {
      const detalles = p.Detalle_Pedidos.map(d => ({
        nombre: d.Vinilo?.Catalogo_Vinilo?.nombre_albums ?? '—',
        artista: d.Vinilo?.Catalogo_Vinilo?.Artista?.nombre ?? '',
        cantidad: d.cantidad
      }));

      return {
        id_pedido: p.id_pedido,
        numero_guia: p.numero_guia,
        estatus: p.estatus,
        fecha: p.createdAt?.toISOString().split('T')[0],
        total: p.total,
        detalles
      };
    });

    return { pedidos };

  } catch (err) {
    console.error('Error al cargar pedidos:', err);
    return { pedidos: [] };
  }
}
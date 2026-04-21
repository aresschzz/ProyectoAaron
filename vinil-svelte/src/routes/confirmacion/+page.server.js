import { error, redirect } from '@sveltejs/kit';
import Orden from '$lib/server/models/Orden.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';

export async function load({ url, cookies }) {
  const usuarioId = cookies.get('usuario_id');
  if (!usuarioId) throw redirect(302, '/login');

  const idOrden = url.searchParams.get('orden');
  if (!idOrden) throw error(400, 'Orden no especificada');

  try {
    const orden = await Orden.findOne({
      where: { id_orden: idOrden, id_usuario: usuarioId },
      include: [
        {
          model: Detalle_Orden,
          as: "detalles",
          include: [
            {
              model: Vinilo,
              as: "vinilo",
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
            }
          ]
        }
      ]
    });

    if (!orden) throw error(404, 'Orden no encontrada');

    return { orden: orden.toJSON() };
  } catch (err) {
    console.error('Error al cargar confirmación:', err);
    throw error(500, 'Error al obtener la orden');
  }
}

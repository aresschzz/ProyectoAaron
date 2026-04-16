import { error, redirect } from '@sveltejs/kit';
import Orden from '$lib/server/models/Orden.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';

export async function load({ cookies }) {
  const usuarioId = cookies.get('usuario_id');
  if (!usuarioId) throw redirect(302, '/login');

  try {
    const ordenes = await Orden.findAll({
      where: { id_usuario: usuarioId },
      include: [
        {
          model: Detalle_Orden,
          include: [
            {
              model: Vinilo,
              include: [{ model: Catalogo_Vinilo, include: [{ model: Artista }] }]
            }
          ]
        }
      ],
      order: [['fecha', 'DESC']]
    });

    return { ordenes: ordenes.map(o => o.toJSON()) };
  } catch (err) {
    console.error('Error al cargar compras:', err);
    throw error(500, 'Error al obtener el historial de compras');
  }
}

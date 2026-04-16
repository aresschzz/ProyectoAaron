import { error } from '@sveltejs/kit';
import Orden from '$lib/server/models/Orden.js';
import Detalle_Orden from '$lib/server/models/Detalle_Orden.js';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Usuario from '$lib/server/models/Usuario.js';

export async function load() {
  try {
    const ordenes = await Orden.findAll({
      include: [
        {
          model: Usuario,
          attributes: ['id_user', 'nombre', 'apellido_pa', 'correo']
        },
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
    console.error('Error al cargar ventas:', err);
    throw error(500, 'Error al obtener las ventas');
  }
}

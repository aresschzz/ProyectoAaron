import { error } from '@sveltejs/kit';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Genero from '$lib/server/models/Genero.js';
import Empresa from '$lib/server/models/Empresa.js';
import Estado_Vinilo from '$lib/server/models/Estado_Vinilo.js';

export async function load({ url }) {
  const id = url.searchParams.get('id');
  if (!id) throw error(400, 'ID de vinilo requerido');
  try {
    const vinilo = await Vinilo.findByPk(id, {
      include: [
        {
          model: Catalogo_Vinilo,
          include: [
            { model: Artista },
            { model: Genero },
            { model: Empresa }
          ]
        },
        { model: Estado_Vinilo }
      ]
    });
    if (!vinilo) throw error(404, 'Vinilo no encontrado');
    return { vinilo: vinilo.toJSON() };
  } catch (err) {
    console.error('Error al cargar detalle:', err);
    throw error(500, 'Error al obtener el vinilo');
  }
}

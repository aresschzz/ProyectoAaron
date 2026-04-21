import { error, fail } from '@sveltejs/kit';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Genero from '$lib/server/models/Genero.js';
import Estado_Vinilo from '$lib/server/models/Estado_Vinilo.js';

export async function load() {
  try {
    const [vinilos, estadosVinilo] = await Promise.all([
      Vinilo.findAll({
        include: [
          {
            model: Catalogo_Vinilo,
            as: "catalogo_vinilo",
            include: [
              { model: Artista, as: "artista" },
              { model: Genero, as: "genero" }
            ]
          },
          { model: Estado_Vinilo }
        ],
        order: [['id_vinilo', 'DESC']]
      }),
      Estado_Vinilo.findAll()
    ]);

    return {
      vinilos: vinilos.map(v => v.toJSON()),
      estadosVinilo: estadosVinilo.map(e => e.toJSON())
    };
  } catch (err) {
    console.error('Error al cargar inventario:', err);
    throw error(500, 'Error al obtener el inventario');
  }
}

export const actions = {
  toggleDisponibilidad: async ({ request }) => {
    const data = await request.formData();
    const idVinilo   = data.get('id_vinilo');
    const disponible = data.get('disponible') === 'true';

    try {
      await Vinilo.update(
        { disponible: !disponible },
        { where: { id_vinilo: idVinilo } }
      );
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar disponibilidad:', err);
      return fail(500, { error: 'No se pudo actualizar' });
    }
  },

  eliminar: async ({ request }) => {
    const data = await request.formData();
    const idVinilo = data.get('id_vinilo');

    try {
      await Vinilo.destroy({ where: { id_vinilo: idVinilo } });
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar vinilo:', err);
      return fail(500, { error: 'No se pudo eliminar el vinilo' });
    }
  }
};

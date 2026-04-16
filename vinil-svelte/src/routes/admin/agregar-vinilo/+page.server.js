import { fail } from '@sveltejs/kit';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Genero from '$lib/server/models/Genero.js';
import Empresa from '$lib/server/models/Empresa.js';
import Estado_Vinilo from '$lib/server/models/Estado_Vinilo.js';

export async function load() {
  try {
    const [artistas, generos, empresas, estadosVinilo] = await Promise.all([
      Artista.findAll(),
      Genero.findAll(),
      Empresa.findAll(),
      Estado_Vinilo.findAll()
    ]);

    return {
      artistas: artistas.map(a => a.toJSON()),
      generos: generos.map(g => g.toJSON()),
      empresas: empresas.map(e => e.toJSON()),
      estadosVinilo: estadosVinilo.map(e => e.toJSON())
    };
  } catch (err) {
    console.error('Error al cargar formulario:', err);
    return { artistas: [], generos: [], empresas: [], estadosVinilo: [] };
  }
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const albumNombre   = data.get('album')?.toString().trim();
    const artistaNombre = data.get('artista')?.toString().trim();
    const precioVenta   = data.get('precio_venta');
    const precioCompra  = data.get('precio_compra');
    const idEstadoVinilo= data.get('id_estado_vinilo');
    const idGenero      = data.get('id_genero');
    const idEmpresa     = data.get('id_empresa');

    if (!albumNombre || !artistaNombre || !precioVenta || !precioCompra) {
      return fail(400, { error: 'Completa todos los campos obligatorios' });
    }

    try {
      const [artista] = await Artista.findOrCreate({
        where: { nombre: artistaNombre }
      });

      const catalogo = await Catalogo_Vinilo.create({
        nombre_albums: albumNombre,
        id_artista: artista.id_artista,
        id_genero: idGenero || null,
        id_empresa: idEmpresa || null
      });

      await Vinilo.create({
        id_catalogo: catalogo.id_catalogo_vinilo,
        id_estado_vinilo: idEstadoVinilo || null,
        precio_venta: precioVenta,
        precio_compra: precioCompra,
        disponible: true
      });

      return { success: true };
    } catch (err) {
      console.error('Error al agregar vinilo:', err);
      return fail(500, { error: 'No se pudo guardar en la base de datos' });
    }
  }
};
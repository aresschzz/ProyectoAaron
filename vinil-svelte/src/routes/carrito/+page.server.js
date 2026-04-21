import { redirect } from '@sveltejs/kit';
import Vinilo from '$lib/server/models/Vinilo.js';
import Catalogo_Vinilo from '$lib/server/models/Catalogo_Vinilo.js';
import Artista from '$lib/server/models/Artista.js';
import Estado_Vinilo from '$lib/server/models/Estado_Vinilo.js';
import Empresa from '$lib/server/models/Empresa';
import Genero from '$lib/server/models/Genero.js';


export async function load({ url, cookies }) {
  const usuarioId = cookies.get('usuario_id');
  if (!usuarioId) throw redirect(302, '/login');
  const idsParam = url.searchParams.get('ids');
  if (!idsParam) return { items: [], total: '0.00', noDisponibles: [] };
  const ids = idsParam.split(',').map(Number).filter(Boolean);
  try {
    const vinilos = await Vinilo.findAll({
      where: { id_vinilo: ids, disponible: true },
      include: [
        {
          model: Catalogo_Vinilo,
          as: "catalogo_vinilo", 
          include: [
            { 
              model: Artista,
              as: "artista"   
            },
            {
              model: Genero, as: "genero"
            },
            {
              model: Empresa, as: "empresa"
            }

          ]
        },
        { 
          model: Estado_Vinilo,
          as: "estado_vinilo" 
        }
      ]
    });
    const items = vinilos.map(v => v.toJSON());
    const total = items
      .reduce((sum, v) => sum + parseFloat(v.precio_venta || 0), 0)
      .toFixed(2);
    const idsEncontrados = items.map(v => v.id_vinilo);
    const noDisponibles  = ids.filter(id => !idsEncontrados.includes(id));
    return { items, total, noDisponibles };
  } catch (err) {
    console.error('Error al cargar carrito:', err);
    return { items: [], total: '0.00', noDisponibles: [] };
  }
}

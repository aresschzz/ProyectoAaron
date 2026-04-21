import { error, fail, redirect } from '@sveltejs/kit';
import Usuario from '$lib/server/models/Usuario.js';
import Rol from '$lib/server/models/Rol.js';
import Direccion from '$lib/server/models/Direccion.js';

export async function load({ cookies }) {
  const usuarioId = cookies.get('usuario_id');
  if (!usuarioId) throw redirect(302, '/login');

  try {
    const usuario = await Usuario.findByPk(usuarioId, {
      include: [
        { model: Rol, as: 'rol' },
        { model: Direccion, as: 'direccion' }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!usuario) throw error(404, 'Usuario no encontrado');

    return { usuario: usuario.toJSON() };
  } catch (err) {
    console.error('Error al cargar perfil:', err);
    throw error(500, 'Error al obtener el perfil');
  }
}

export const actions = {
  actualizar: async ({ request, cookies }) => {
    const usuarioId = cookies.get('usuario_id');
    if (!usuarioId) return fail(401, { error: 'No autenticado' });

    const data = await request.formData();
    const nombre     = data.get('nombre')?.toString().trim();
    const apellidoPa = data.get('apellido_pa')?.toString().trim();
    const apellidoMa = data.get('apellido_ma')?.toString().trim();
    const telefono   = data.get('telefono')?.toString().trim();

    try {
      await Usuario.update(
        { nombre, apellido_pa: apellidoPa, apellido_ma: apellidoMa, telefono },
        { where: { id_us: id_usuario } }
      );
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      return fail(500, { error: 'No se pudo actualizar el perfil' });
    }
  },

  cerrarSesion: async ({ cookies }) => {
    cookies.delete('usuario_id', { path: '/' });
    cookies.delete('usuario_rol', { path: '/' });
    return edirect(302, '/login');
  }
};

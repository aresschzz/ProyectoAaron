import { fail, redirect } from '@sveltejs/kit';
import Usuario from '$lib/server/models/Usuario.js';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const correo   = data.get('correo')?.toString().trim();
    const password = data.get('password')?.toString();

    if (!correo || !password) {
      return fail(400, { error: 'Correo y contraseña son requeridos' });
    }

    try {
      const usuario = await Usuario.findOne({ where: { correo } });

      if (!usuario) {
        return fail(401, { error: 'Credenciales incorrectas' });
      }

      // TODO: reemplazar con bcrypt.compare cuando implementes hash
      const passwordValida = password === usuario.password;
      if (!passwordValida) {
        return fail(401, { error: 'Credenciales incorrectas' });
      }

      cookies.set('usuario_id', String(usuario.id_user), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24
      });
      cookies.set('usuario_rol', String(usuario.id_rol), {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24
      });

    } catch (err) {
      console.error('Error en login:', err);
      return fail(500, { error: 'Error interno del servidor' });
    }

    redirect(302, '/catalogo');
  }
};

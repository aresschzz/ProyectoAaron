import { fail } from '@sveltejs/kit';
import Usuario from '$lib/server/models/Usuario.js';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const nombre     = data.get('nombre')?.toString().trim();
    const apellidoPa = data.get('apellido_pa')?.toString().trim();
    const apellidoMa = data.get('apellido_ma')?.toString().trim();
    const telefono   = data.get('telefono')?.toString().trim();
    const correo     = data.get('correo')?.toString().trim();
    const password   = data.get('password')?.toString();

    if (!nombre || !correo || !password) {
      return fail(400, { error: 'Nombre, correo y contraseña son requeridos' });
    }

    try {
      const existe = await Usuario.findOne({ where: { correo } });
      if (existe) {
        return fail(409, { error: 'Ya existe una cuenta con ese correo' });
      }

      // TODO: hash con bcrypt antes de guardar en producción
      await Usuario.create({
        nombre,
        apellido_pa: apellidoPa,
        apellido_ma: apellidoMa,
        telefono,
        correo,
        password,
        id_rol: 2
      });

      return { success: true };
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      return fail(500, { error: 'No se pudo crear la cuenta' });
    }
  }
};

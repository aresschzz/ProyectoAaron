import { error, fail } from '@sveltejs/kit';
import Usuario from '$lib/server/models/Usuario.js';
import Rol from '$lib/server/models/Rol.js';

export async function load() {
  try {
    const [usuarios, roles] = await Promise.all([
      Usuario.findAll({
        include: [{ model: Rol }],
        attributes: { exclude: ['password'] },
        order: [['id_user', 'ASC']]
      }),
      Rol.findAll()
    ]);

    return {
      usuarios: usuarios.map(u => u.toJSON()),
      roles: roles.map(r => r.toJSON())
    };
  } catch (err) {
    console.error('Error al cargar usuarios:', err);
    throw error(500, 'Error al obtener los usuarios');
  }
}

export const actions = {
  cambiarRol: async ({ request }) => {
    const data  = await request.formData();
    const idUser = data.get('id_user');
    const idRol  = data.get('id_rol');

    try {
      await Usuario.update({ id_rol: idRol }, { where: { id_user: idUser } });
      return { success: true };
    } catch (err) {
      console.error('Error al cambiar rol:', err);
      return fail(500, { error: 'No se pudo actualizar el rol' });
    }
  },

  eliminar: async ({ request }) => {
    const data   = await request.formData();
    const idUser = data.get('id_user');

    try {
      await Usuario.destroy({ where: { id_user: idUser } });
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      return fail(500, { error: 'No se pudo eliminar el usuario' });
    }
  }
};

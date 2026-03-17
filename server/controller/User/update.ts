import bcrypt from 'bcryptjs';
import User from '../../db/tablas/User';

const VALID_ROLES = ['admin', 'repartidor', 'preparador'];

const update = async (id: string, body: any) => {
  if (!id) throw new Error('El id es requerido.');
  const user = await User.findByPk(id);
  if (!user) throw new Error('No se encontró un usuario con ese id.');

  if (body.role && !VALID_ROLES.includes(body.role)) {
    throw new Error(`Rol inválido. Debe ser uno de: ${VALID_ROLES.join(', ')}.`);
  }

  const dataUpdate: any = {};
  const allowed = ['username', 'role', 'phone', 'name', 'address'];
  allowed.forEach((field) => {
    if (body[field] !== undefined) dataUpdate[field] = body[field];
  });

  // Hash password if provided as plain text
  if (body.password) {
    const salt = await bcrypt.genSalt(10);
    dataUpdate.password_hash = await bcrypt.hash(body.password, salt);
  }

  await User.update(dataUpdate, { where: { id } });
  const updated = await User.findByPk(id, { attributes: { exclude: ['password_hash'] } });
  return { message: 'Usuario actualizado correctamente.', data: updated };
};

export default update;

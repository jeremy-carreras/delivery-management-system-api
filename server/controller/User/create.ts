const { randomUUID } = require('crypto');
import bcrypt from 'bcryptjs';
import User from '../../db/tablas/User';

const VALID_ROLES = ['admin', 'repartidor', 'preparador'];

const create = async (body: any) => {
  const { username, password, role, phone, name, address } = body;
  if (!username) throw new Error('El username es requerido.');
  if (!password) throw new Error('El password es requerido.');

  const roleToUse = role || 'preparador';
  if (!VALID_ROLES.includes(roleToUse)) {
    throw new Error(`Rol inválido. Debe ser uno de: ${VALID_ROLES.join(', ')}.`);
  }

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) throw new Error('El username ya está en uso.');

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    id: randomUUID(),
    username,
    password_hash,
    role: roleToUse,
    phone,
    name,
    address,
  });
  return { message: 'Usuario creado correctamente.', data: { id: user.id, username: user.username, role: user.role } };
};

export default create;

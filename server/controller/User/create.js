const { randomUUID } = require('crypto');
const User = require('../../db/tablas/User');

const create = async (body) => {
  const { username, password_hash, role, phone, name, address } = body;
  if (!username) throw new Error('El username es requerido.');
  if (!password_hash) throw new Error('El password es requerido.');

  const user = await User.create({
    id: randomUUID(),
    username,
    password_hash,
    role: role || 'user',
    phone,
    name,
    address,
  });
  return { message: 'Usuario creado correctamente.', data: { id: user.id, username: user.username, role: user.role } };
};

module.exports = create;

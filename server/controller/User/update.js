const User = require('../../db/tablas/User');

const update = async (id, body) => {
  if (!id) throw new Error('El id es requerido.');
  const user = await User.findByPk(id);
  if (!user) throw new Error('No se encontró un usuario con ese id.');

  const allowed = ['username', 'password_hash', 'role', 'phone', 'name', 'address'];
  const dataUpdate = {};
  allowed.forEach((field) => {
    if (body[field] !== undefined) dataUpdate[field] = body[field];
  });

  await User.update(dataUpdate, { where: { id } });
  return { message: 'Usuario actualizado correctamente.' };
};

module.exports = update;

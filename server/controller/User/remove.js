const User = require('../../db/tablas/User');

const remove = async (id) => {
  if (!id) throw new Error('El id es requerido.');
  const user = await User.findByPk(id);
  if (!user) throw new Error('No se encontró un usuario con ese id.');
  await user.destroy();
  return { message: 'Usuario eliminado correctamente.' };
};

module.exports = remove;

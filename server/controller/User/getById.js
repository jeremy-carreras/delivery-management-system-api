const User = require('../../db/tablas/User');

const getById = async (id) => {
  if (!id) throw new Error('El id es requerido.');
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password_hash'] },
  });
  if (!user) throw new Error('No se encontró un usuario con ese id.');
  return { message: 'Usuario obtenido correctamente.', data: user };
};

module.exports = getById;

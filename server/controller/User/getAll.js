const User = require('../../db/tablas/User');

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password_hash'] },
  });
  return { message: 'Usuarios obtenidos correctamente.', data: users };
};

module.exports = getAll;

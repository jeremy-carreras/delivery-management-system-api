const Category = require('../../db/tablas/Category');

const getAll = async () => {
  const categories = await Category.findAll();
  return { message: 'Categorías obtenidas correctamente.', data: categories };
};

module.exports = getAll;

const Product = require('../../db/tablas/Product');
const Category = require('../../db/tablas/Category');

const getAll = async () => {
  const products = await Product.findAll({
    include: [{ model: Category, as: 'category' }],
  });
  return { message: 'Productos obtenidos correctamente.', data: products };
};

module.exports = getAll;

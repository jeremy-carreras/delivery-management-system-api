import Product from '../../db/tablas/Product';
import Category from '../../db/tablas/Category';

const getAll = async () => {
  const products = await Product.findAll({
    include: [{ model: Category, as: 'category' }],
  });
  return { message: 'Productos obtenidos correctamente.', data: products };
};

export default getAll;

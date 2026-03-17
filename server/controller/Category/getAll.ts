import Category from '../../db/tablas/Category';

const getAll = async () => {
  const categories = await Category.findAll();
  return { message: 'Categorías obtenidas correctamente.', data: categories };
};

export default getAll;

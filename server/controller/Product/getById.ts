import Product from '../../db/tablas/Product';
import Category from '../../db/tablas/Category';

const getById = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const product = await Product.findByPk(id, {
    include: [{ model: Category, as: 'category' }],
  });
  if (!product) throw new Error('No se encontró un producto con ese id.');
  return { message: 'Producto obtenido correctamente.', data: product };
};

export default getById;

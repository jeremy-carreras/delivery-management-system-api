import Product from '../../db/tablas/Product';

const remove = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const product = await Product.findByPk(id);
  if (!product) throw new Error('No se encontró un producto con ese id.');
  await product.destroy();
  return { message: 'Producto eliminado correctamente.' };
};

export default remove;

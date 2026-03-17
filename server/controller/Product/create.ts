import Product from '../../db/tablas/Product';

const create = async (body: any) => {
  const { id, name, price, unit, category_id, image, is_available } = body;
  if (!id) throw new Error('El id es requerido.');
  if (!name) throw new Error('El nombre es requerido.');
  if (price === undefined) throw new Error('El precio es requerido.');
  if (!unit) throw new Error('La unidad es requerida.');

  const product = await Product.create({ id, name, price, unit, category_id, image, is_available });
  return { message: 'Producto creado correctamente.', data: product };
};

export default create;

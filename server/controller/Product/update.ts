import Product from '../../db/tablas/Product';

const update = async (id, body: any) => {
  if (!id) throw new Error('El id es requerido.');
  const product = await Product.findByPk(id);
  if (!product) throw new Error('No se encontró un producto con ese id.');

  const allowed = ['name', 'price', 'unit', 'category_id', 'image', 'is_available'];
  const dataUpdate = {};
  allowed.forEach((field) => {
    if (body[field] !== undefined) dataUpdate[field] = body[field];
  });

  await Product.update(dataUpdate, { where: { id } });
  return { message: 'Producto actualizado correctamente.' };
};

export default update;

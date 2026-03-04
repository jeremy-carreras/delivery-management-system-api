const OrderItem = require('../../db/tablas/OrderItem');

const update = async (id, body) => {
  if (!id) throw new Error('El id es requerido.');
  const item = await OrderItem.findByPk(id);
  if (!item) throw new Error('No se encontró un item con ese id.');

  const allowed = ['product_id', 'product_name', 'quantity', 'price_at_time', 'bread_type', 'flavors'];
  const dataUpdate = {};
  allowed.forEach((field) => {
    if (body[field] !== undefined) dataUpdate[field] = body[field];
  });

  await OrderItem.update(dataUpdate, { where: { id } });
  return { message: 'Item de orden actualizado correctamente.' };
};

module.exports = update;

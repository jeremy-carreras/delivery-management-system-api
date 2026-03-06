const Order = require('../../db/tablas/Order');

const update = async (id, body) => {
  if (!id) throw new Error('El id es requerido.');
  const order = await Order.findByPk(id);
  if (!order) throw new Error('No se encontró una orden con ese id.');

  const allowed = ['user_id', 'customer_name', 'customer_phone', 'delivery_address', 'total', 'status', 'cancellation_reason'];
  const dataUpdate = {};
  allowed.forEach((field) => {
    if (body[field] !== undefined) dataUpdate[field] = body[field];
  });

  await Order.update(dataUpdate, { where: { id } });
  return { message: 'Orden actualizada correctamente.' };
};

module.exports = update;

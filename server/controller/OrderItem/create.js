const { randomUUID } = require('crypto');
const OrderItem = require('../../db/tablas/OrderItem');

const create = async (body) => {
  const { order_id, product_id, product_name, quantity, price_at_time, bread_type, flavors } = body;
  if (!order_id) throw new Error('El order_id es requerido.');
  if (!product_name) throw new Error('El nombre del producto es requerido.');
  if (!quantity) throw new Error('La cantidad es requerida.');
  if (price_at_time === undefined) throw new Error('El precio es requerido.');

  const item = await OrderItem.create({
    id: randomUUID(),
    order_id,
    product_id,
    product_name,
    quantity,
    price_at_time,
    bread_type,
    flavors,
  });
  return { message: 'Item de orden creado correctamente.', data: item };
};

module.exports = create;

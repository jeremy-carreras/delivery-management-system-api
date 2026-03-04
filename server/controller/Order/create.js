const Order = require('../../db/tablas/Order');

const generateOrderId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `ORD-${year}-${random}`;
};

const create = async (body) => {
  const { id, user_id, customer_name, customer_phone, delivery_address, total, status } = body;
  if (!customer_name) throw new Error('El nombre del cliente es requerido.');
  if (!customer_phone) throw new Error('El teléfono del cliente es requerido.');
  if (!delivery_address) throw new Error('La dirección de entrega es requerida.');
  if (total === undefined) throw new Error('El total es requerido.');

  const order = await Order.create({
    id: id || generateOrderId(),
    user_id,
    customer_name,
    customer_phone,
    delivery_address,
    total,
    status: status || 'Pending',
  });
  return { message: 'Orden creada correctamente.', data: order };
};

module.exports = create;

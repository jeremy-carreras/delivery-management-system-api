const Order = require('../../db/tablas/Order');
const OrderItem = require('../../db/tablas/OrderItem');
const User = require('../../db/tablas/User');

const getById = async (id) => {
  if (!id) throw new Error('El id es requerido.');
  const order = await Order.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: ['id', 'name', 'username'] },
      { model: OrderItem, as: 'items' },
    ],
  });
  if (!order) throw new Error('No se encontró una orden con ese id.');
  return { message: 'Orden obtenida correctamente.', data: order };
};

module.exports = getById;

const Order = require('../../db/tablas/Order');
const OrderItem = require('../../db/tablas/OrderItem');
const User = require('../../db/tablas/User');

const getAll = async () => {
  const orders = await Order.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name', 'username'] },
      { model: OrderItem, as: 'items' },
    ],
  });
  return { message: 'Órdenes obtenidas correctamente.', data: orders };
};

module.exports = getAll;

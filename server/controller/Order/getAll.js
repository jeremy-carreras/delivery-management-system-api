const Order = require('../../db/tablas/Order');
const OrderItem = require('../../db/tablas/OrderItem');
const User = require('../../db/tablas/User');

const getAll = async (phone) => {
  const queryOptions = {
    include: [
      { model: User, as: 'user', attributes: ['id', 'name', 'username'] },
      { model: OrderItem, as: 'items' },
    ],
  };

  if (phone) {
    queryOptions.where = { customer_phone: phone };
  }

  const orders = await Order.findAll(queryOptions);
  return { message: 'Órdenes obtenidas correctamente.', data: orders };
};

module.exports = getAll;

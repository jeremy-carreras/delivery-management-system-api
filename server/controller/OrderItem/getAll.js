const OrderItem = require('../../db/tablas/OrderItem');

const getAll = async () => {
  const items = await OrderItem.findAll();
  return { message: 'Items de órdenes obtenidos correctamente.', data: items };
};

module.exports = getAll;

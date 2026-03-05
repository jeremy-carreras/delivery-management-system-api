const Order = require('../../db/tablas/Order');
const OrderItem = require('../../db/tablas/OrderItem');

const generateOrderId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `ORD-${year}-${random}`;
};

const create = async (body) => {
  const { id, user_id, customer_name, customer_phone, delivery_address, total, status, items } = body;
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

  if (items && Array.isArray(items) && items.length > 0) {
    const orderItems = items.map(item => ({
      order_id: order.id,
      // Only include product_id if it looks like a real UUID, not a cart-generated composite ID
      product_id: null,
      product_name: item.name,
      quantity: item.quantity,
      price_at_time: item.price,
      bread_type: item.breadType || null,
      flavors: item.flavors ? JSON.stringify(item.flavors) : null,
    }));

    try {
      await OrderItem.bulkCreate(orderItems);
      console.log(`[Order ${order.id}] ${orderItems.length} item(s) saved successfully.`);
    } catch (err) {
      console.error(`[Order ${order.id}] Error saving items:`, err.message);
      throw new Error('Orden creada pero no se pudieron guardar los productos: ' + err.message);
    }
  }

  return { message: 'Orden creada correctamente.', data: order };
};

module.exports = create;

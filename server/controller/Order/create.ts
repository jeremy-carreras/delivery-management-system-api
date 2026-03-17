import Order from '../../db/tablas/Order';
import OrderItem from '../../db/tablas/OrderItem';

const generateOrderId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `ORD-${year}-${random}`;
};

const create = async (body: any) => {
  // Support both snake_case and camelCase
  const id = body.id;
  const user_id = body.user_id || body.userId;
  const customer_name = body.customer_name || body.customerName;
  const customer_phone = body.customer_phone || body.customerPhone;
  const delivery_address = body.delivery_address || body.deliveryAddress;
  const total = body.total;
  const status = body.status;
  const items = body.items;

  console.log(`[Order Create] Creating order with:`, { id, customer_name, itemsCount: items?.length });

  if (!customer_name) throw new Error('El nombre del cliente es requerido.');
  if (!customer_phone) throw new Error('El teléfono del cliente es requerido.');
  if (!delivery_address) throw new Error('La dirección de entrega es requerida.');
  if (total === undefined) throw new Error('El total es requerido.');

  const orderId = id || generateOrderId();

  const order = await Order.create({
    id: orderId,
    user_id,
    customer_name,
    customer_phone,
    delivery_address,
    total,
    status: status || 'Pending',
  });

  if (items && Array.isArray(items) && items.length > 0) {
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: null,
      product_name: item.name,
      quantity: item.quantity,
      price_at_time: item.price,
      bread_type: item.breadType || item.bread_type || null,
      flavors: item.flavors ? (typeof item.flavors === 'string' ? item.flavors : JSON.stringify(item.flavors)) : null,
    }));

    try {
      await OrderItem.bulkCreate(orderItems);
      console.log(`[Order ${orderId}] ${orderItems.length} items saved.`);
    } catch (err: any) {
      console.error(`[Order ${orderId}] Error saving items:`, err.message);
      throw new Error('Orden creada pero no se pudieron guardar los productos: ' + err.message);
    }
  }

  return { message: 'Orden creada correctamente.', data: order };
};

export default create;

import Order from '../../db/tablas/Order';
import OrderItem from '../../db/tablas/OrderItem';
import User from '../../db/tablas/User';

const getAll = async (phone?: string, userId?: string, userRole?: string) => {
  const queryOptions: any = {
    include: [
      { model: User, as: 'user', attributes: ['id', 'name', 'username'] },
      { model: User, as: 'repartidor', attributes: ['id', 'name', 'username', 'phone'] },
      { model: OrderItem, as: 'items' },
    ],
    where: {}
  };

  if (phone) {
    queryOptions.where.customer_phone = phone;
  }
  
  if (userRole === 'repartidor' && userId) {
    queryOptions.where.assigned_to = userId;
  }

  const orders = await Order.findAll(queryOptions);
  return { message: 'Órdenes obtenidas correctamente.', data: orders };
};

export default getAll;

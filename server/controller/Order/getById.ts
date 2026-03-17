import Order from '../../db/tablas/Order';
import OrderItem from '../../db/tablas/OrderItem';
import User from '../../db/tablas/User';

const getById = async (id: any) => {
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

export default getById;

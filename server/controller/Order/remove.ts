import Order from '../../db/tablas/Order';

const remove = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const order = await Order.findByPk(id);
  if (!order) throw new Error('No se encontró una orden con ese id.');
  await order.destroy();
  return { message: 'Orden eliminada correctamente.' };
};

export default remove;

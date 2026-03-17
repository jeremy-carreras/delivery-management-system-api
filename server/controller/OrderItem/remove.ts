import OrderItem from '../../db/tablas/OrderItem';

const remove = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const item = await OrderItem.findByPk(id);
  if (!item) throw new Error('No se encontró un item con ese id.');
  await item.destroy();
  return { message: 'Item de orden eliminado correctamente.' };
};

export default remove;

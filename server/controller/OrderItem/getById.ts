import OrderItem from '../../db/tablas/OrderItem';

const getById = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const item = await OrderItem.findByPk(id);
  if (!item) throw new Error('No se encontró un item con ese id.');
  return { message: 'Item obtenido correctamente.', data: item };
};

export default getById;

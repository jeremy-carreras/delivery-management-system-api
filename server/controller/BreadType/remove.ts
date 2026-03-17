import BreadType from '../../db/tablas/BreadType';

const remove = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const type = await BreadType.findByPk(id);
  if (!type) throw new Error('No se encontró un tipo de pan con ese id.');
  await type.destroy();
  return { message: 'Tipo de pan eliminado correctamente.' };
};
export default remove;

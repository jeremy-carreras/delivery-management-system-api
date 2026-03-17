import BreadType from '../../db/tablas/BreadType';

const update = async (id, body: any) => {
  if (!id) throw new Error('El id es requerido.');
  const type = await BreadType.findByPk(id);
  if (!type) throw new Error('No se encontró un tipo de pan con ese id.');
  if (body.name !== undefined) await BreadType.update({ name: body.name }, { where: { id } });
  return { message: 'Tipo de pan actualizado correctamente.' };
};
export default update;

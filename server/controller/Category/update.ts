import Category from '../../db/tablas/Category';

const update = async (id, body: any) => {
  if (!id) throw new Error('El id es requerido.');
  const category = await Category.findByPk(id);
  if (!category) throw new Error('No se encontró una categoría con ese id.');

  const dataUpdate: any = {};
  if (body.name !== undefined) dataUpdate.name = body.name;
  if (body.type !== undefined) dataUpdate.type = body.type;

  await Category.update(dataUpdate, { where: { id } });
  return { message: 'Categoría actualizada correctamente.' };
};

export default update;

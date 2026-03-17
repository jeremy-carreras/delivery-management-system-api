import Category from '../../db/tablas/Category';

const remove = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const category = await Category.findByPk(id);
  if (!category) throw new Error('No se encontró una categoría con ese id.');
  await category.destroy();
  return { message: 'Categoría eliminada correctamente.' };
};

export default remove;

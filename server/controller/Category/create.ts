const { randomUUID } = require('crypto');
import Category from '../../db/tablas/Category';

const create = async (body: any) => {
  const { name, type } = body;
  if (!name) throw new Error('El nombre es requerido.');
  const category = await Category.create({ id: randomUUID(), name, type: type || 'Normal' });
  return { message: 'Categoría creada correctamente.', data: category };
};

export default create;

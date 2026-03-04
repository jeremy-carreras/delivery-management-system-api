const { randomUUID } = require('crypto');
const Category = require('../../db/tablas/Category');

const create = async (body) => {
  const { name, type } = body;
  if (!name) throw new Error('El nombre es requerido.');
  const category = await Category.create({ id: randomUUID(), name, type: type || 'Normal' });
  return { message: 'Categoría creada correctamente.', data: category };
};

module.exports = create;

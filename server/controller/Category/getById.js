const Category = require('../../db/tablas/Category');

const getById = async (id) => {
  if (!id) throw new Error('El id es requerido.');
  const category = await Category.findByPk(id);
  if (!category) throw new Error('No se encontró una categoría con ese id.');
  return { message: 'Categoría obtenida correctamente.', data: category };
};

module.exports = getById;

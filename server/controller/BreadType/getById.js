const BreadType = require('../../db/tablas/BreadType');

const getById = async (id) => {
  if (!id) throw new Error('El id es requerido.');
  const type = await BreadType.findByPk(id);
  if (!type) throw new Error('No se encontró un tipo de pan con ese id.');
  return { message: 'Tipo de pan obtenido correctamente.', data: type };
};
module.exports = getById;

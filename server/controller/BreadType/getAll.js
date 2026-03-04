const BreadType = require('../../db/tablas/BreadType');

const getAll = async () => {
  const types = await BreadType.findAll();
  return { message: 'Tipos de pan obtenidos correctamente.', data: types };
};
module.exports = getAll;

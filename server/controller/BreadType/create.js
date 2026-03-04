const BreadType = require('../../db/tablas/BreadType');

const create = async (body) => {
  const { name } = body;
  if (!name) throw new Error('El nombre es requerido.');
  const type = await BreadType.create({ name });
  return { message: 'Tipo de pan creado correctamente.', data: type };
};
module.exports = create;

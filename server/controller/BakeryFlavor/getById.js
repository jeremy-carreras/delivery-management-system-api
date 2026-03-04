const BakeryFlavor = require('../../db/tablas/BakeryFlavor');

const getById = async (id) => {
  if (!id) throw new Error('El id es requerido.');
  const flavor = await BakeryFlavor.findByPk(id);
  if (!flavor) throw new Error('No se encontró un sabor con ese id.');
  return { message: 'Sabor obtenido correctamente.', data: flavor };
};
module.exports = getById;

const BakeryFlavor = require('../../db/tablas/BakeryFlavor');

const getAll = async () => {
  const flavors = await BakeryFlavor.findAll();
  return { message: 'Sabores obtenidos correctamente.', data: flavors };
};
module.exports = getAll;

import BakeryFlavor from '../../db/tablas/BakeryFlavor';

const getAll = async () => {
  const flavors = await BakeryFlavor.findAll();
  return { message: 'Sabores obtenidos correctamente.', data: flavors };
};
export default getAll;

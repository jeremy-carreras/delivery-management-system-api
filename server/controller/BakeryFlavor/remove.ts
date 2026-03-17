import BakeryFlavor from '../../db/tablas/BakeryFlavor';

const remove = async (id: any) => {
  if (!id) throw new Error('El id es requerido.');
  const flavor = await BakeryFlavor.findByPk(id);
  if (!flavor) throw new Error('No se encontró un sabor con ese id.');
  await flavor.destroy();
  return { message: 'Sabor eliminado correctamente.' };
};
export default remove;

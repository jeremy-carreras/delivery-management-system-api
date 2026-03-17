import BakeryFlavor from '../../db/tablas/BakeryFlavor';

const update = async (id, body: any) => {
  if (!id) throw new Error('El id es requerido.');
  const flavor = await BakeryFlavor.findByPk(id);
  if (!flavor) throw new Error('No se encontró un sabor con ese id.');
  if (body.name !== undefined) await BakeryFlavor.update({ name: body.name }, { where: { id } });
  return { message: 'Sabor actualizado correctamente.' };
};
export default update;

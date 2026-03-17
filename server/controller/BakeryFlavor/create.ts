import BakeryFlavor from '../../db/tablas/BakeryFlavor';

const create = async (body: any) => {
  const { name } = body;
  if (!name) throw new Error('El nombre es requerido.');
  const flavor = await BakeryFlavor.create({ name });
  return { message: 'Sabor creado correctamente.', data: flavor };
};
export default create;

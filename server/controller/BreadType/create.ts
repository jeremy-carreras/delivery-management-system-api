import BreadType from '../../db/tablas/BreadType';

const create = async (body: any) => {
  const { name } = body;
  if (!name) throw new Error('El nombre es requerido.');
  const type = await BreadType.create({ name });
  return { message: 'Tipo de pan creado correctamente.', data: type };
};
export default create;

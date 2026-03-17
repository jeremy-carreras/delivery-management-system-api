import bcrypt from 'bcryptjs';
import User from '../../db/tablas/User';
const { randomUUID } = require('crypto');

const register = async (body: any) => {
  const { username, password, phone, name, address } = body;
  if (!username) throw new Error('El username es requerido.');
  if (!password) throw new Error('El password es requerido.');

  // Check if username already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) throw new Error('El username ya está en uso.');

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    id: randomUUID(),
    username,
    password_hash,
    role: 'preparador', // default role
    phone,
    name,
    address,
  });

  return { 
    message: 'Usuario registrado correctamente.', 
    data: { id: user.id, username: user.username, role: user.role } 
  };
};

export default register;

const bcrypt = require('bcryptjs');
const User = require('../../db/tablas/User');

const login = async (body) => {
  const { username, password } = body;
  
  if (!username) throw new Error('El username es requerido.');
  if (!password) throw new Error('El password es requerido.');

  // Check for admin bypass
  if (username === 'admin' && password === 'admin') {
    return {
      message: 'Login exitoso (admin bypass)',
      user: { username: 'admin', role: 'admin', phone: '' }
    };
  }

  // Find user by username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('Credenciales inválidas.');
  }

  // Compare provided password with hashed password in database
  const isMatch = await bcrypt.compare(password, user.password_hash);
  
  if (!isMatch) {
    throw new Error('Credenciales inválidas.');
  }

  return {
    message: 'Login exitoso.',
    user: { 
      id: user.id,
      username: user.username, 
      role: user.role, 
      phone: user.phone || '',
      name: user.name || '',
      address: user.address || ''
    }
  };
};

module.exports = login;

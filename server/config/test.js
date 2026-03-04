const sequelize = require('./sequelize.conf');
require('colors');

sequelize
  .authenticate()
  .then(() => {
    console.log('Se ha conectado a la base de datos exitosamente.'.green);
    process.exit();
  })
  .catch((err) => {
    console.error('Hubo un error al conectarse a la base de datos: '.red, err);
    process.exit();
  });

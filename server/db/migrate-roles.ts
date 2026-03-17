require('../config/config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USERDB, process.env.PASSWORDDB, {
  host: process.env.HOSTDB,
  dialect: process.env.TYPEDB,
  logging: (sql: string) => console.log('[SQL]', sql),
});

const migrate = async () => {
  console.log('Conectando a la base de datos...');
  await sequelize.authenticate();
  console.log('Conexion exitosa.');

  // Step 1: temporarily change to VARCHAR to allow value update
  await sequelize.query(`ALTER TABLE users MODIFY COLUMN role VARCHAR(20) NOT NULL DEFAULT 'preparador'`);
  console.log('Columna cambiada a VARCHAR temporalmente.');

  // Step 2: update old 'user' values
  const [results] = await sequelize.query(`UPDATE users SET role = 'preparador' WHERE role = 'user'`) as any;
  console.log(`Filas actualizadas de 'user' a 'preparador': ${results.affectedRows ?? 0}`);

  // Step 3: now apply the correct ENUM
  await sequelize.query(
    `ALTER TABLE users MODIFY COLUMN role ENUM('admin','repartidor','preparador') NOT NULL DEFAULT 'preparador'`
  );
  console.log('ENUM de roles actualizado: admin, repartidor, preparador');

  await sequelize.close();
  process.exit(0);
};

migrate().catch((err) => {
  console.error('Error en la migracion:', err.message);
  process.exit(1);
});

export {};


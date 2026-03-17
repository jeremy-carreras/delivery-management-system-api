require('../config/config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USERDB, process.env.PASSWORDDB, {
  host: process.env.HOSTDB,
  dialect: process.env.TYPEDB,
  logging: false,
});

async function migrate() {
  console.log('Migrando: agregando columna assigned_to a orders...');
  try {
    // Add column if not exists
    await sequelize.query(`
      ALTER TABLE orders 
      ADD COLUMN assigned_to VARCHAR(36) DEFAULT NULL;
    `);
    
    // Add foreign key constraint
    await sequelize.query(`
      ALTER TABLE orders
      ADD CONSTRAINT fk_orders_assigned_to 
      FOREIGN KEY (assigned_to) REFERENCES users(id) 
      ON DELETE SET NULL ON UPDATE CASCADE;
    `);
    
    console.log('Migracion exitosa!');
  } catch (error) {
    // If it fails because column exists, that's fine
    if (error.message.includes('Duplicate column name')) {
      console.log('La columna ya existe. Todo bien.');
    } else {
      console.error('Error:', error.message);
    }
  } finally {
    process.exit(0);
  }
}

migrate();

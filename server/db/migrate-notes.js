/**
 * Migration: Add `notes` column to the `orders` table.
 * Run from project root: node server/db/migrate-notes.js
 */
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USERDB, process.env.PASSWORDDB, {
  host: process.env.HOSTDB,
  dialect: process.env.TYPEDB,
  logging: false,
});

async function migrate() {
  console.log('Migrando: agregando columna notes a orders...');
  try {
    await sequelize.query(`ALTER TABLE orders ADD COLUMN notes TEXT DEFAULT NULL;`);
    console.log('✅  Columna notes agregada exitosamente.');
  } catch (error) {
    if (error.message.includes('Duplicate column name')) {
      console.log('ℹ️  La columna notes ya existe. Todo bien.');
    } else {
      console.error('❌  Error:', error.message);
    }
  } finally {
    process.exit(0);
  }
}

migrate();

require('./config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USERDB,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTDB,
    dialect: process.env.TYPEDB,
    logging: false,
    dialectOptions: {
      useUTC: false,
    },
    timezone: '-05:00',
  }
);

module.exports = sequelize;

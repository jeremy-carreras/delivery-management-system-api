import './config';
import { Sequelize, Dialect } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB as string,
  process.env.USERDB as string,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTDB,
    dialect: (process.env.TYPEDB as Dialect) || 'mysql',
    logging: false,
    dialectOptions: {
      useUTC: false,
    },
    timezone: '-05:00',
  }
);

export default sequelize;

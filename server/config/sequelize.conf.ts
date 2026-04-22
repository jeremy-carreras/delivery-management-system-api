import './config';
import { Sequelize, Dialect } from 'sequelize';

const isAiven = (process.env.HOSTDB || '').includes('aivencloud.com');

const sequelize = new Sequelize(
  process.env.DB as string,
  process.env.USERDB as string,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTDB,
    port: isAiven ? 28365 : undefined,
    dialect: (process.env.TYPEDB as Dialect) || 'mysql',
    logging: false,
    dialectOptions: {
      useUTC: false,
      ...(isAiven
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
    },
    timezone: '-05:00',
  }
);

export default sequelize;

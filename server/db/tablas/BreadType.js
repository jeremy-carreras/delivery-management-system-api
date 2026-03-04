const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

const BreadType = sequelize.define(
  'bread_types',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = BreadType;

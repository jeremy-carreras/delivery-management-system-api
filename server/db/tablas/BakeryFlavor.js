const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

const BakeryFlavor = sequelize.define(
  'bakery_flavors',
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

module.exports = BakeryFlavor;

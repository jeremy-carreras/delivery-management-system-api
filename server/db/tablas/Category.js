const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

const Category = sequelize.define(
  'categories',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM('Normal', 'Custom'),
      defaultValue: 'Normal',
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = Category;

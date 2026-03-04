const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define(
  'order_items',
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    order_id: {
      type: DataTypes.STRING(50),
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.STRING(50),
      references: {
        model: 'products',
        key: 'id',
      },
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    price_at_time: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bread_type: {
      type: DataTypes.STRING(50),
    },
    flavors: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });

module.exports = OrderItem;

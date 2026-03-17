import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';
import Order from './Order';
import Product from './Product';

export interface OrderItemAttributes {
  id: string;
  order_id?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  price_at_time: number;
  bread_type?: string;
  flavors?: any; // JSON
}

export interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id' | 'order_id' | 'product_id' | 'bread_type' | 'flavors'> {}

class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  declare id: string;
  declare order_id: string;
  declare product_id: string;
  declare product_name: string;
  declare quantity: number;
  declare price_at_time: number;
  declare bread_type: string;
  declare flavors: any;
}

OrderItem.init(
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
    sequelize,
    tableName: 'order_items',
    timestamps: false,
    freezeTableName: true,
  }
);

OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });

export default OrderItem;

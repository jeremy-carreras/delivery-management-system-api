import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';
import User from './User';

export interface OrderAttributes {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  total: number;
  status?: 'Pending' | 'Accepted' | 'Preparando' | 'En reparto' | 'Entregado' | 'Cancelled';
  cancellation_reason?: string;
  assigned_to?: string;
  created_at?: Date;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'user_id' | 'status' | 'cancellation_reason' | 'assigned_to' | 'created_at'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  declare id: string;
  declare user_id: string;
  declare customer_name: string;
  declare customer_phone: string;
  declare delivery_address: string;
  declare total: number;
  declare status: 'Pending' | 'Accepted' | 'Preparando' | 'En reparto' | 'Entregado' | 'Cancelled';
  declare cancellation_reason: string;
  declare assigned_to: string;
  declare readonly created_at: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(36),
      references: {
        model: 'users',
        key: 'id',
      },
    },
    customer_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    customer_phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Accepted', 'Preparando', 'En reparto', 'Entregado', 'Cancelled'),
      defaultValue: 'Pending',
    },
    cancellation_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assigned_to: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    freezeTableName: true,
  }
);

Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

Order.belongsTo(User, { foreignKey: 'assigned_to', as: 'repartidor' });
User.hasMany(Order, { foreignKey: 'assigned_to', as: 'assignedOrders' });

export default Order;

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';

export interface UserAttributes {
  id: string;
  username: string;
  password_hash: string;
  role?: 'admin' | 'repartidor' | 'preparador';
  phone?: string;
  name?: string;
  address?: string;
  created_at?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role' | 'created_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare username: string;
  declare password_hash: string;
  declare role: 'admin' | 'repartidor' | 'preparador';
  declare phone: string;
  declare name: string;
  declare address: string;
  declare readonly created_at: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'repartidor', 'preparador'),
      defaultValue: 'preparador',
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    freezeTableName: true,
  }
);

export default User;

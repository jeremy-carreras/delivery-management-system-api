import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';

export interface CategoryAttributes {
  id: string;
  name: string;
  type?: 'Normal' | 'Custom';
  created_at?: Date;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'type' | 'created_at'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: string;
  public name!: string;
  public type!: 'Normal' | 'Custom';
  public readonly created_at!: Date;
}

Category.init(
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
    sequelize,
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Category;

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';
import Category from './Category';

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  unit: string;
  category_id?: string;
  image?: string;
  is_available?: boolean;
  created_at?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'category_id' | 'image' | 'is_available' | 'created_at'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public price!: number;
  public unit!: string;
  public category_id!: string;
  public image!: string;
  public is_available!: boolean;
  public readonly created_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING(36),
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    image: {
      type: DataTypes.TEXT,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    freezeTableName: true,
  }
);

Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

export default Product;

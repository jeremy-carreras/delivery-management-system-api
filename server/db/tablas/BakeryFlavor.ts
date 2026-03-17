import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';

export interface BakeryFlavorAttributes {
  id: number;
  name: string;
}

export interface BakeryFlavorCreationAttributes extends Optional<BakeryFlavorAttributes, 'id'> {}

class BakeryFlavor extends Model<BakeryFlavorAttributes, BakeryFlavorCreationAttributes> implements BakeryFlavorAttributes {
  public id!: number;
  public name!: string;
}

BakeryFlavor.init(
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
    sequelize,
    tableName: 'bakery_flavors',
    timestamps: false,
    freezeTableName: true,
  }
);

export default BakeryFlavor;

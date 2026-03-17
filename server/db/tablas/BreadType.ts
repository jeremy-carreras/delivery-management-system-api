import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/sequelize.conf';

export interface BreadTypeAttributes {
  id: number;
  name: string;
}

export interface BreadTypeCreationAttributes extends Optional<BreadTypeAttributes, 'id'> {}

class BreadType extends Model<BreadTypeAttributes, BreadTypeCreationAttributes> implements BreadTypeAttributes {
  public id!: number;
  public name!: string;
}

BreadType.init(
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
    tableName: 'bread_types',
    timestamps: false,
    freezeTableName: true,
  }
);

export default BreadType;

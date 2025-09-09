import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database";

export enum ProductType {
  KG = "kg",
  UNIT = "unit",
}

export class Product extends Model {
  public id!: number;
  public name!: string;
  public selling_price!: string;
  public type!: ProductType;
  public amount!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selling_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ProductType)),
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

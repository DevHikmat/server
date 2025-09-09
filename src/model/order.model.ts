import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database";

export class Order extends Model {
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    sequelize,
    tableName: "order",
  }
);

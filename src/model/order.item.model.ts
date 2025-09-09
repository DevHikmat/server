import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database";

export class OrderItem extends Model {
  public id!: number;
  public amount!: string;
  public price!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "order-item",
  }
);

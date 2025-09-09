import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database";

export class ProductHistory extends Model {
  public id!: number;
  public buying_price!: string;  
  public amount!: string;  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buying_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product-history",
  }
);

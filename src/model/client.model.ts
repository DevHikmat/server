import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database";

export class Client extends Model {
  public id!: number;
  public fullname!: string;
  public phone1!: string;  
  public phone2!: string | null;  
  public balance!: string;  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    sequelize,
    tableName: "clients",
  }
);

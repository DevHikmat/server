import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database";
import { UserType } from "../enums/user.enum";

export class User extends Model {
  public id!: number;
  public fullname!: string;
  public username!: string;
  public password!: string;
  public phone1!: string;  
  public phone2!: string;  
  public role!: UserType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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
    role: {
      type: DataTypes.ENUM(...Object.values(UserType)),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "users",
  }
);

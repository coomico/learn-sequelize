import { DataTypes, Model } from "sequelize";
import PG from "../config/pg.js";
import { regEmail } from "../utils/validator.js";

class Student extends Model {};
Student.init(
  {
    nim: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM(),
      values: ['male', 'female'],
      allowNull: false
    },
    major: {
      type: DataTypes.ENUM(),
      values: ['MKN', 'ASP', 'MAP'],
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        is: regEmail
      },
      allowNull: false
    },
    ip: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    }
  },
  {
    sequelize: PG.repo,
    modelName: 'student'
  }
);

export default Student;
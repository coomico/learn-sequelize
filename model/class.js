import { DataTypes, Model } from "sequelize";
import PG from "../config/pg.js";
import { regClassNumb } from "../utils/validator.js";

class Class extends Model {};
Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      type: DataTypes.STRING(10),
      validate: {
        is: regClassNumb
      },
      allowNull: false
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false
    }
  },
  {
    sequelize: PG.repo,
    modelName: 'class'
  }
);

export default Class;
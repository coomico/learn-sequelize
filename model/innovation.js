import { DataTypes, Model } from "sequelize";
import PG from "../config/pg.js";

class Innovation extends Model {};
Innovation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: PG.repo,
    modelName: 'innovation'
  }
);

export default Innovation;
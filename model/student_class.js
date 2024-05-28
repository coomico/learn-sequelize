import { Model } from "sequelize";
import PG from "../config/pg.js";

class Student_Class extends Model {};
Student_Class.init({}, {sequelize: PG.repo, modelName: 'student_class'});

export default Student_Class;
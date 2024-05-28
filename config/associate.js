import Class from "../model/class.js";
import Student from "../model/student.js";
import Innovation from "../model/innovation.js";
import Student_Class from "../model/student_class.js";

class Associate {
  static init() {
    // Student and Class relations
    Student.belongsToMany(Class, {through: Student_Class});
    Class.belongsToMany(Student, {through: Student_Class});
    
    // Student and Innovation relations
    Student.hasMany(Innovation);
    Innovation.belongsTo(Student);
  }
}

export default Associate;
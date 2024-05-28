import Class from "../model/class.js";
import Innovation from "../model/innovation.js";
import Student from "../model/student.js";

class StudentService {

  static getOne = async (nim) => {
    const student = await Student.findOne({
      where: {
        nim: nim
      }
    });

    if (!student) {
      throw new Error("_not_found_");
    }

    return student;
  };

  static getAll = async () => {
    const students = await Student.findAll({
      include: {
        model: Class,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        through: {
          attributes: []
        }
      }
    });

    return students;
  };

  static getInnovations = async (nim) => {
    const studentInnovations = await Student.findOne({
      where: {
        nim: nim
      },
      include: {
        model: Innovation,
        attributes: {
          exclude: ["studentNim"]
        }
      }
    });

    if (!studentInnovations) {
      throw new Error("_not_found_");
    }

    return studentInnovations;
  };

  static create = async (data) => {
    const theClass = await Class.findOne({
      where: {
        number: data.class_number
      }
    });

    if (!theClass) {
      throw new Error("_not_found_");
    }

    const newStudent = await Student.create({
      nim: data.nim,
      name: data.name,
      gender: data.gender,
      major: data.major,
      email: data.email,
      ip: data.ip
    });

    await newStudent.addClass(theClass);
    return newStudent;
  };

  static addClass = async (classNumber, studentNim) => {
    const theClass = await Class.findOne({
      where: {
        number: classNumber
      }
    });

    if (!theClass) {
      throw new Error("_not_found_");
    }

    const student = await Student.findOne({
      where: {
        nim: studentNim
      },
      include: {
        model: Class,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        through: {
          attributes: []
        }
      }
    });

    if (!student) {
      throw new Error("_not_found_");
    }

    const classList = student.classes.map((c) => c.number);
    if (classList.indexOf(classNumber) !== -1) {
      throw new Error("_already_exist_");
    }

    await student.addClass(theClass);
    await student.reload();
    return student;
  };
  
  static delete = async (nim) => {
    await Student.destroy({
      where: {
        nim: nim
      },
      cascade: true
    });
  };
};

export default StudentService;
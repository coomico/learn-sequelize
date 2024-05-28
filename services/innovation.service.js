import Innovation from "../model/innovation.js";
import Student from "../model/student.js";

class InnovationService {
  
  // static getOne = async () => {};
  static getAll = async () => {
    const innovations = await Innovation.findAll({
      include: {
        model: Student,
        attributes: {
          exclude: ["nim", "createdAt", "updatedAt"]
        }
      }
    });

    return innovations;
  };

  static create = async (title, desc, studentNim) => {
    const student = await Student.findOne({
      where: {
        nim: studentNim
      }
    });

    if (!student) {
      throw new Error("_not_found_");
    }

    const innovation = await Innovation.create({
      title: title,
      desc: desc
    });

    await innovation.setStudent(student);

    await innovation.reload()
    return innovation;
  };

  // static delete = async () => {};

};

export default InnovationService;
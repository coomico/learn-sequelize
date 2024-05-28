import Class from "../model/class.js";
import Student from "../model/student.js";

class ClassService {

  static getOne = async (number) => {
    const theClass = await Class.findOne({
      where: {
        number: number
      }
    });

    if (!theClass) {
      throw new Error("_not_found_");
    }

    return theClass;
  };

  static getAll = async () => {
    const classes = await Class.findAll({
      include: {
        model: Student,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        through: {
          attributes: []
        }
      }
    });

    return classes;
  };

  static create = async (number, content) => {
    const newClass = await Class.create({
      number: number,
      content: content
    });

    return newClass;
  };

  static delete = async (number) => {
    await Class.destroy({
      where: {
        number: number
      },
      cascade: true
    });
  };
};

export default ClassService;
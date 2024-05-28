import ClassService from "../services/class.service.js";
import { isClassNumbValid } from "../utils/validator.js";

class ClassController {

  static getClass = async (req, res) => {
    const { number } = req.params;

    try {
      const theClass = await ClassService.getOne(number);
      return res.status(200).json(theClass);
    } catch (error) {
      if (error.message === '_not_found_') {
        return res.status(404).json({msg: "Not found!"})
      }
    }
  }
  
  static getClasses = async (req, res) => {
    const classes = await ClassService.getAll();
    return res.status(200).json(classes);
  };

  static createClass = async (req, res) => {
    const data = req.body;
    if (!data || !data.number || !data.content) {
      return res.status(400).json({msg: "Missing required field!"});
    }

    if (!isClassNumbValid(data.number)) {
      return res.status(400).json({msg: "Invalid payload!"});
    }

    const {number, content} = data;
    const classroom = await ClassService.create(number, content);
    return res.status(200).json(classroom);
  };
  
  // static updateClass() {};

  static deleteClass = async (req, res) => {
    const { number } = req.params;
    if (!number) {
      return res.status(400).json({msg: "Missing required field!"});
    }

    await ClassService.delete(number);
    return res.status(200).json({msg: "Success!"});
  };
};

export default ClassController;
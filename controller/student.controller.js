import StudentService from "../services/student.service.js";
import { isClassNumbValid, isEmailValid } from "../utils/validator.js";

class StudentController {

  static getStudent = async (req, res) => {
    const { nim } = req.params;
    if (!nim) {
      return res.status(400).json({msg: "Missing required field!"});
    }

    try {
      const student = await StudentService.getOne(nim);
      return res.status(200).json(student);
    } catch (error) {
      if (error.message === '_not_found_') {
        return res.status(404).json({msg: "Not found!"})
      }
    }
  };

  static getStudents = async (req, res) => {
    const students = await StudentService.getAll();
    return res.status(200).json(students);
  };

  static getInnovations = async (req, res) => {
    const { nim } = req.params;
    if (!nim) {
      return res.status(400).json({msg: "Missing required field!"});
    }
    
    try {
      const innovations = await StudentService.getInnovations(nim);
      return res.status(200).json(innovations);
    } catch (error) {
      if (error.message === '_not_found_') {
        return res.status(404).json({msg: "Not found!"})
      }
    }
  };

  static createStudent = async (req, res) => {
    const data = req.body
    if (!data ||
      !data.nim ||
      !data.name ||
      !data.gender ||
      !data.email ||
      !data.class_number) {
      return res.status(400).json({msg: "Missing required field!"});
    }

    if (!isEmailValid(data.email) || !isClassNumbValid(data.class_number)) {
      return res.status(400).json({msg: "Invalid payload!"});
    }

    try {
      const student = await StudentService.create(data);
      return res.status(200).json(student);
    } catch (error) {

      //custom error
      if (error.message === '_not_found_') {
        return res.status(404).json({msg: "Not found!"})
      }

      // database error
      console.log(error.parent);
      switch (error.parent.code) {
        case '23505':
          return res.status(400).json({msg: "Nim already exist!"})
        case '22P02':
          return res.status(400).json({msg: "Invalid payload!"});
      }

      return res.status(400).json({msg: "Server error!"});
    }
  };

  static addClass = async (req, res) => {
    const { nim } = req.params;
    const data = req.body;
    if(!nim || !data || !data.class_number) {
      return res.status(400).json({msg: "Missing required field!"});
    }

    if (!isClassNumbValid(data.class_number)) {
      return res.status(400).json({msg: "Invalid payload!"});
    }

    try {
      const student = await StudentService.addClass(data.class_number, nim);
      return res.status(200).json(student);
    } catch (error) {
            
      // custom error
      switch (error.message) {
        case '_already_exist_':
          return res.status(400).json({msg: "The class already exists!"});
        case '_not_found_':
          return res.status(404).json({msg: "Not found!"})
      }

      return res.status(400).json({msg: "Server error!"});
    }
  };

  // static updateStudent() {};

  static deleteStudent = async (req, res) => {
    const { nim } = req.params;
    if (!nim) {
      return res.status(400).json({msg: "Missing required field!"});
    }

    await StudentService.delete(nim);
    return res.status(200).json({msg: "Success!"});
  };
};

export default StudentController;
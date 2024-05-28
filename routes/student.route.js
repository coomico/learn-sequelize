import express from "express";
import StudentController from "../controller/student.controller.js";

const StudentRouter = express.Router();
const ByNimRouter = express.Router({ mergeParams: true});

StudentRouter.get("/all", StudentController.getStudents);

StudentRouter.use("/:nim", ByNimRouter);

ByNimRouter.get("/", StudentController.getStudent);
ByNimRouter.get("/innovations", StudentController.getInnovations);

// {
//   nim:
//   name:
//   gender:
//   major:
//   email:
//   ip:
//   class_number:
// }
StudentRouter.post("/new", StudentController.createStudent);

// {
//   class_number:
// }
StudentRouter.put("/:nim/add-class", StudentController.addClass);

StudentRouter.delete("/:nim/remove", StudentController.deleteStudent);

export default StudentRouter;
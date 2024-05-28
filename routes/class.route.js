import express from "express";
import ClassController from "../controller/class.controller.js";

const ClassRouter = express.Router();

ClassRouter.get("/all", ClassController.getClasses);
ClassRouter.get("/:number", ClassController.getClass);

// {
//   number:
//   content:
// }
ClassRouter.post("/new", ClassController.createClass);

ClassRouter.delete("/:number/remove", ClassController.deleteClass);

export default ClassRouter;
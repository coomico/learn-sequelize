import express from "express";
import InnovationController from "../controller/innovation.controller.js";

const InnovationRouter = express.Router();

InnovationRouter.get("/all", InnovationController.getInnovations);

// {
//   title:
//   desc:
//   student_nim:
// }
InnovationRouter.post("/new", InnovationController.createInnovation);

export default InnovationRouter;
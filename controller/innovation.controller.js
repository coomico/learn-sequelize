import InnovationService from "../services/innovation.service.js";

class InnovationController {

  static getInnovations = async (req, res) => {
    const innovations = await InnovationService.getAll();
    return res.status(200).json(innovations);
  };

  static createInnovation = async (req, res) => {
    const data = req.body;
    if (!data ||
      !data.title ||
      !data.desc ||
      !data.student_nim) {
        return res.status(400).json({msg: "Missing required field!"});
    }

    try {
      const innovation = await InnovationService.create(data.title, data.desc, data.student_nim);
      return res.status(200).json(innovation);
    } catch (error) {
      if (error.message === "_not_found_") {
        return res.status(404).json({msg: "Not found!"})
      }

      return res.status(400).json({msg: "Server error!"});
    }
  };
};

export default InnovationController;
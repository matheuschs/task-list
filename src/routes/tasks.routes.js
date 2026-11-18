import { Router } from "express";
const router = Router();

import tasksControllers from "../controllers/tasks.controllers.js";
import tasksValidations from "../schemas/tasks.validations.js";

router.get("/", tasksControllers.getTasks);
router.get("/:id", tasksValidations.validateGet, tasksControllers.getTaskById);
router.post("/", tasksValidations.validateCreate, tasksControllers.createTask);
router.patch("/:id", tasksValidations.validateUpdate, tasksControllers.updateTask);
router.delete("/:id", tasksValidations.validateDelete, tasksControllers.deleteTask);

export default router;
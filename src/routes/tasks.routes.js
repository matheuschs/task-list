import { Router } from "express";
const router = Router();

import tasksControllers from "../controllers/tasks.controllers.js";

router.get("/", tasksControllers.getTasks);
router.get("/:id", tasksControllers.getTaskById);
router.post("/", tasksControllers.createTask);
router.patch("/:id", tasksControllers.updateTask);
router.delete("/:id", tasksControllers.deleteTask);

export default router;
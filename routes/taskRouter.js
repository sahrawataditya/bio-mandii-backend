import { Router } from "express";
import { createTask } from "../controllers/tasksController.js";

export const taskRouter = Router();

taskRouter.use(authMiddleware);
taskRouter.post("/create", createTask);

import { Router } from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "../controllers/tasksController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
export const taskRouter = Router();

taskRouter.use(authMiddleware);
taskRouter.post("/create", createTask);
taskRouter.get("/getTasks", getTasks);
taskRouter.get("/getSingleTask/:id", getSingleTask);
taskRouter.patch("/updateTask/:id", updateTask);
taskRouter.delete("/deleteTask/:id", deleteTask);
taskRouter.delete("/deleteAllTasks", deleteAllTasks);

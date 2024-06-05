import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/authConroller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.delete("/delete/:id", deleteUser);
authRouter.get("/allUsers", getAllUsers);

authRouter.use(authMiddleware);
authRouter.get("/getUser", getUser);
authRouter.put("/updateUser", updateUser);

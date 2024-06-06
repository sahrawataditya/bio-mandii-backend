import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDb } from "./lib/Db.js";
import { errorMiddleware } from "./middlewares/error.js";
import { authRouter } from "./routes/authRouter.js";
import { taskRouter } from "./routes/taskRouter.js";
dotenv.config({ path: "./.env" });
connectDb();

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);
app.use(morgan("dev"));
app.use("/api/v1", authRouter);
app.use("/api/v1/task", taskRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);

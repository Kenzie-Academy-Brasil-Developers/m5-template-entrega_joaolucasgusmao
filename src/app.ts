import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";
import helmet from "helmet";
import cors from "cors"
import { taskRouter } from "./routers/tasks.router";
import { categoryRouter } from "./routers/categories.router";
import { handleErrors } from "./middlewares";
import { userRouter } from "./routers";

export const app: Application = express();

app.use(cors())
app.use(helmet());
app.use(json());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.use(handleErrors);

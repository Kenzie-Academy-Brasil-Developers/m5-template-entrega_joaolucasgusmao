import { Router } from "express";
import { TaskController } from "../controllers";
import { ensure } from "../middlewares";
import { createTaskSchema, updateTaskSchema } from "../schemas";
import { container } from "tsyringe";
import { TaskServices } from "../services";

const taskRouter = Router();

container.registerSingleton("TaskServices", TaskServices);
const controller = container.resolve(TaskController);

taskRouter.post(
  "",
  ensure.tokenIsValid,
  ensure.validBody(createTaskSchema),
  ensure.categoryIdExists,
  (req, res) => controller.create(req, res),
);
taskRouter.get("", ensure.tokenIsValid, (req, res) =>
  controller.read(req, res),
);

taskRouter.use(
  "/:id",
  ensure.tokenIsValid,
  ensure.idExists,
  ensure.isTaskOwner,
);

taskRouter.get("/:id", (req, res) => controller.retrieve(req, res));

taskRouter.patch("/:id", ensure.validBody(updateTaskSchema), (req, res) =>
  controller.update(req, res),
);

taskRouter.delete("/:id", (req, res) => controller.delete(req, res));

export { taskRouter };

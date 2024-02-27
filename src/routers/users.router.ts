import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers";
import { UserServices } from "../services";
import { ensure } from "../middlewares";
import { userCreateSchema, userLoginSchema } from "../schemas";

const userRouter = Router();

container.registerSingleton("UserServices", UserServices);
const controller = container.resolve(UserController);

userRouter.post("", ensure.validBody(userCreateSchema), (req, res) =>
  controller.register(req, res),
);
userRouter.post("/login", ensure.validBody(userLoginSchema), (req, res) =>
  controller.login(req, res),
);
userRouter.get("/profile", ensure.tokenIsValid, (req, res) =>
  controller.autoLogin(req, res),
);

export { userRouter };

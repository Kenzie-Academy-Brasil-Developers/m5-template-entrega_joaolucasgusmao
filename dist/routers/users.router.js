"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
tsyringe_1.container.registerSingleton("UserServices", services_1.UserServices);
const controller = tsyringe_1.container.resolve(controllers_1.UserController);
userRouter.post("", middlewares_1.ensure.validBody(schemas_1.userCreateSchema), (req, res) => controller.register(req, res));
userRouter.post("/login", middlewares_1.ensure.validBody(schemas_1.userLoginSchema), (req, res) => controller.login(req, res));
userRouter.get("/profile", middlewares_1.ensure.tokenIsValid, (req, res) => controller.autoLogin(req, res));
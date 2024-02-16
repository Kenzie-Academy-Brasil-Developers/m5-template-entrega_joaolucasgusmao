import { Router } from "express";
import { CategoryController } from "../controllers";
import { container } from "tsyringe";
import { CategoryServices } from "../services";
import { ensure } from "../middlewares";
import { createCategorySchema } from "../schemas";

const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);
const controller = container.resolve(CategoryController)

categoryRouter.post("", ensure.validBody(createCategorySchema), (req, res) => controller.create(req, res));
categoryRouter.delete("/:id", ensure.deleteCategoryIdExists, (req, res) => controller.delete(req, res));

export { categoryRouter };

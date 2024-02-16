import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "./errors/AppError";
import { AnyZodObject } from "zod";

class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
      async (req: Request, _: Response, next: NextFunction): Promise<void> => {
        req.body = await schema.parseAsync(req.body);

        return next();
      };

  public idExists = async (req: Request, _: Response, next: NextFunction) => {

    const { id } = req.params;

    const taskFound = await prisma.task.findFirst({ where: { id: Number(id) } });

    if (!taskFound) throw new AppError("Task not found", 404);

    return next();
  };

  public categoryIdExists = async (
    req: Request,
    __: Response,
    next: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.body;

    if (!categoryId) return next();

    const categoryFound = await prisma.category.findFirst({ where: { id: categoryId } });

    if (!categoryFound) throw new AppError("Category not found", 404);

    return next();
  };

  public deleteCategoryIdExists = async (
    req: Request,
    __: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    const allTasks = await prisma.category.findFirst({ where: { id: Number(id) } });

    if (!allTasks) throw new AppError("Category not found", 404);

    return next();
  };
};

const ensure = new EnsureMiddleware();

export { ensure };

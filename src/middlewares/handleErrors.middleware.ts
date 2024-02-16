import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./errors";

class HandleErrorMiddleware {
  public static execute = (
    error: Error,
    _: Request,
    res: Response,
    __: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }

    return res.status(500).json({ message: "Internal Server Error." });
  };
}

const handleErrors = HandleErrorMiddleware.execute;

export { handleErrors };

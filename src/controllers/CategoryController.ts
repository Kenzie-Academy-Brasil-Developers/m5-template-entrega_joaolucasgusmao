import { Request, Response } from "express";
import { CategoryServices } from "../services";
import { inject, injectable } from "tsyringe";

@injectable()
class CategoryController {
  constructor(@inject("CategoryServices") private CategoriesServices: CategoryServices) { };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newCategory = await this.CategoriesServices.create(req.body);

    return res.status(201).json(newCategory);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.CategoriesServices.delete(Number(req.params.id));

    return res.status(204).json();
  };
}

export { CategoryController };

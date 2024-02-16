import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { categoryReturn, createCategory } from "../interfaces";
import { categorySchema } from "../schemas";

@injectable()
class CategoryServices {
  public create = async (data: createCategory): Promise<categoryReturn> => {
    const category = await prisma.category.create({ data });

    return categorySchema.parse(category);
  };

  public delete = async (categoryId: number): Promise<void> => {
    await prisma.category.delete({ where: { id: categoryId } });
  };
}

export { CategoryServices };

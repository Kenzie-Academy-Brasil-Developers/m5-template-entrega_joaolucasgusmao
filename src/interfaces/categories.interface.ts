import { z } from "zod";
import { categorySchema, createCategorySchema } from "../schemas";

type createCategory = z.infer<typeof createCategorySchema>;
type categoryReturn = z.infer<typeof categorySchema>;

export { createCategory, categoryReturn };

import { z } from "zod";
import { baseSchema } from "./base.schema";

const categorySchema = baseSchema.extend({
  name: z.string().min(1).max(255),
  userId: z.number().positive().nullish(),
});

const createCategorySchema = categorySchema.omit({ id: true });

export { categorySchema, createCategorySchema };

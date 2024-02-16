import { z } from "zod";
import { baseSchema } from "./base.schema";
import { categorySchema } from "./categories.schema";

const taskSchema = baseSchema.extend({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish()
});

const createTaskSchema = taskSchema.omit({ id: true});

const getTaskSchema = taskSchema.omit({ categoryId: true }).extend({
  category: categorySchema.nullish(),
});

const updateTaskSchema = taskSchema
  .omit({ id: true });

export {
  taskSchema,
  createTaskSchema,
  getTaskSchema,
  updateTaskSchema,
};

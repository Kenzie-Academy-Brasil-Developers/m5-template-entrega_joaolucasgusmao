import { z } from "zod";
import {
  createTaskSchema,
  getTaskSchema,
  taskSchema,
} from "../schemas";

type taskCreate = z.infer<typeof createTaskSchema> & { categoryId: number | null };
type taskReturn = z.infer<typeof taskSchema>;
type getTask = z.infer<typeof getTaskSchema>;
type updateTask = Partial<taskCreate>


export { taskCreate, taskReturn, getTask, updateTask};

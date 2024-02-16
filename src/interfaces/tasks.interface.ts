import { z } from "zod";
import {
  createTaskSchema,
  getTaskSchema,
  taskSchema,
} from "../schemas";

type TaskCreate = z.infer<typeof createTaskSchema> & { categoryId: number | null };
type TaskReturn = z.infer<typeof taskSchema>;
type GetTask = z.infer<typeof getTaskSchema>;
type UpdateTask = Partial<TaskCreate>


export { TaskCreate, TaskReturn, GetTask, UpdateTask};

import {
  getTask,
  taskCreate,
  taskReturn,
  updateTask,
} from "../interfaces";
import { prisma } from "../database/prisma";
import { getTaskSchema, taskSchema } from "../schemas";
import { injectable } from "tsyringe";


@injectable()
class TaskServices {
  public create = async (data: taskCreate): Promise<taskReturn> => {

    const newTask = await prisma.task.create({ data });

    return taskSchema.parse(newTask);
  };

  public read = async (categoryName?: string): Promise<Array<getTask>> => {

    if (categoryName) {
      const task = await prisma.task.findMany({
        where: {
          category: {
            name: {
              contains: categoryName,
              mode: "insensitive",
            },
          },
        },
        include: { category: true },
        take: 1
      });
      return getTaskSchema.array().parse(task);
    }
    const taskList = await prisma.task.findMany({
      include: { category: true },
    });

    return getTaskSchema.array().parse(taskList.sort((a, b) => a.id - b.id));
  };

  // public search = async (categoryName: string): Promise<Array<getTask>> => {
  //   const task = await prisma.task.findMany({
  //     where: { category: { name: { contains: categoryName, mode: "insensitive" } } },
  //     include: { category: true },
  //     take: 1
  //   });

  //   return getTaskSchema.array().parse(task);
  // };

  public retrieve = async (taskId: number): Promise<getTask> => {
    const foundTask = await prisma.task.findFirst({
      where: { id: taskId },
      include: { category: true },
    });

    return getTaskSchema.parse(foundTask);
  };

  public update = async (
    taskId: number,
    data: updateTask
  ): Promise<taskReturn> => {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return taskSchema.parse(task);
  };

  public delete = async (taskId: number): Promise<void> => {
    await prisma.task.delete({ where: { id: taskId } });
  };
}

export { TaskServices };

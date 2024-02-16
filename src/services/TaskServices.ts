import {
  TaskCreate,
  TaskReturn,
  GetTask,
  UpdateTask,
} from "../interfaces";
import { prisma } from "../database/prisma";
import { getTaskSchema, taskSchema } from "../schemas";
import { injectable } from "tsyringe";


@injectable()
class TaskServices {
  public create = async (data: TaskCreate): Promise<TaskReturn> => {

    const newTask = await prisma.task.create({ data });

    return taskSchema.parse(newTask);
  };

  public read = async (categoryName: string | undefined): Promise<Array<GetTask>> => {

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
    };
    const taskList = await prisma.task.findMany({
      include: { category: true },
    });

    return getTaskSchema.array().parse(taskList.sort((a, b) => a.id - b.id));
  };

  public retrieve = async (taskId: number): Promise<GetTask> => {
    const foundTask = await prisma.task.findFirst({
      where: { id: taskId },
      include: { category: true },
    });

    return getTaskSchema.parse(foundTask);
  };

  public update = async (
    taskId: number,
    data: UpdateTask
  ): Promise<TaskReturn> => {
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

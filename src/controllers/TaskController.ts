import { Request, Response } from "express";
import { TaskServices } from "../services";
import { inject, injectable } from "tsyringe";

@injectable()
class TaskController {
  constructor(@inject("TaskServices") private TaskServices: TaskServices) { };

  public create = async (req: Request, res: Response) => {
    const newTask = await this.TaskServices.create(req.body);

    return res.status(201).json(newTask);
  };

  public read = async (req: Request, res: Response): Promise<Response> => {
    const tasks = await this.TaskServices.read(String(req.query.category))

    return res.status(200).json(tasks);
  };

  public retrieve = async (req: Request, res: Response): Promise<Response> => {
    const task = await this.TaskServices.retrieve(Number(req.params.id));

    return res.status(200).json(task);
  };

  // public search = async (req: Request, res: Response): Promise<Response> => {
  //   const task = await this.TaskServices.search(String(req.query.category));

  //   return res.status(200).json(task);
  // };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const taskUpdated = await this.TaskServices.update(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(taskUpdated);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.TaskServices.delete(Number(req.params.id));

    return res.status(204).json();
  };
}

export { TaskController };

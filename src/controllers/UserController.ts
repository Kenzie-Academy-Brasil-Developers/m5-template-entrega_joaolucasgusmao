import { Request, Response } from "express";
import { UserServices } from "../services";
import { inject, injectable } from "tsyringe";

@injectable()
class UserController {
  constructor(@inject("UserServices") private UserServices: UserServices) {}
  public register = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await this.UserServices.register(req.body);

    return res.status(201).json(newUser);
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    const enter = await this.UserServices.login(req.body);

    return res.status(200).json(enter);
  };

  public autoLogin = async (_: Request, res: Response): Promise<Response> => {
    const user = await this.UserServices.autoLogin(res.locals.decode.user);

    return res.status(200).json(user);
  };
}

export { UserController };

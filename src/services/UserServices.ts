import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import {
  GetUser,
  UserCreate,
  UserLogin,
  UserLoginReturn,
  UserReturn,
} from "../interfaces";
import { AppError } from "../middlewares/errors";
import { userReturnSchema } from "../schemas";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
class UserServices {
  public register = async (data: UserCreate): Promise<UserReturn> => {
    const hashedPwd = await bcrypt.hash(data.password, 10);

    const emailExists = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (emailExists)
      throw new AppError("This email is already registered", 409);

    const newUser = await prisma.user.create({
      data: { ...data, password: hashedPwd },
    });

    return userReturnSchema.parse(newUser);
  };

  public login = async (data: UserLogin): Promise<UserLoginReturn> => {
    const userFound = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!userFound) throw new AppError("User not exists", 404);

    const pwdMatch = await bcrypt.compare(data.password, userFound.password);

    if (!pwdMatch) throw new AppError("Email and password doesn't match", 401);

    const token = jwt.sign({ user: userFound }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return {
      accessToken: token,
      user: userReturnSchema.parse(userFound),
    };
  };

  public autoLogin = async (userId: number): Promise<UserReturn> => {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    return userReturnSchema.parse(user);
  };
}

export { UserServices };

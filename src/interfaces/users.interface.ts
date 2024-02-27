import { z } from "zod";
import {
  userCreateSchema,
  userLoginSchema,
  userReturnSchema,
} from "../schemas";

type UserCreate = z.infer<typeof userCreateSchema>;

type UserLogin = z.infer<typeof userLoginSchema>;

type GetUser = z.infer<typeof userReturnSchema>;

type UserReturn = z.infer<typeof userReturnSchema>;

type UserLoginReturn = {
  accessToken: string;
  user: UserReturn;
};

export { UserCreate, UserLogin, GetUser, UserReturn, UserLoginReturn };

import { z } from "zod";
import { baseSchema } from "./base.schema";

const userSchema = baseSchema.extend({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
});

const userCreateSchema = userSchema.omit({ id: true });

const userLoginSchema = userSchema.omit({ name: true, id: true });

const userReturnSchema = userSchema.omit({ password: true });

export { userSchema, userCreateSchema, userLoginSchema, userReturnSchema };

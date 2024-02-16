import { z } from "zod";

const baseSchema = z.object({
  id: z
    .number()
    .positive()
});

export { baseSchema };

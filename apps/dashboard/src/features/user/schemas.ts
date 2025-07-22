import { z } from 'zod/v4';

export const LoginSchema = z.object({
  username: z.string().trim().nonempty().min(1),
  password: z.string().trim().nonempty().min(1),
});

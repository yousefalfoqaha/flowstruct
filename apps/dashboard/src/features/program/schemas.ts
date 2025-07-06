import { z } from 'zod/v4';
import { Degree } from '@/features/program/types.ts';

export const programDetailsSchema = z.object({
  code: z.string().nonempty().transform((val) => val.toLocaleUpperCase()),
  name: z.string().nonempty(),
  degree: z.enum(Object.keys(Degree)),
});

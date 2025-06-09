import { z } from 'zod/v4';
import { Degree } from '@/features/program/types.ts';

export const programDetailsSchema = z.object({
  code: z.string().transform((val) => val.toLocaleUpperCase()),
  name: z.string(),
  degree: z.enum(Object.keys(Degree)),
});

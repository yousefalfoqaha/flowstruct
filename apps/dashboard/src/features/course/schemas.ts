import { z } from 'zod/v4';
import { CourseType } from '@/features/course/types.ts';

export const courseDetailsSchema = z.object({
  code: z.string().transform((val) => val.toLocaleUpperCase()),
  name: z.string(),
  creditHours: z.number().min(0, { error: 'Must be positive' }),
  ects: z
    .number()
    .min(0, { error: 'Must be positive' })
    .optional()
    .transform((val) => val ?? 0),
  lectureHours: z.number().min(0, { error: 'Must be positive' }),
  practicalHours: z.number().min(0, { error: 'Must be positive' }),
  type: z.enum(Object.keys(CourseType)),
  isRemedial: z.boolean().default(false),
});

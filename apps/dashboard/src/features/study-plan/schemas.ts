import { z } from 'zod/v4';
import { SectionLevel, SectionType } from '@/features/study-plan/types.ts';

export const studyPlanDetailsSchema = z.object({
  program: z.string(),
  year: z.string(),
  duration: z.number().min(1, { error: 'Must be at least 1 year' }).default(4),
  track: z.string(),
});

export const sectionDetailsSchema = z.object({
  level: z.enum(SectionLevel),
  type: z.enum(SectionType),
  requiredCreditHours: z.number().nonnegative({ error: 'Must be positive' }),
  name: z.string(),
});

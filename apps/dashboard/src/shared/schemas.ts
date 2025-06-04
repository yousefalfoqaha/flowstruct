import { z } from 'zod';
import { getDefaultSearchValues } from '@/utils/getDefaultSearchValues.ts';

const defaultValues = getDefaultSearchValues();

export const TableSearchSchema = z.interface({
  filter: z.string().catch(defaultValues.filter),
  page: z.number().catch(defaultValues.page),
  size: z.number().catch(defaultValues.size),
  columnFilters: z
    .array(
      z.object({
        id: z.string(),
        value: z.unknown(),
      })
    )
    .catch(defaultValues.columnFilters),
});

export const FrameworkCoursesTableSearchSchema = TableSearchSchema.extend({
  size: z.number().catch(7),
});

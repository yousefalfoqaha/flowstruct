import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { ProgramsTable } from '@/features/program/components/ProgramsTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export const Route = createFileRoute('/_layout/catalog/programs/')({
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultSearchValues())],
  },
  component: () => <ProgramsTable />,
});

import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { StudyPlansTable } from '@/features/study-plan/components/StudyPlansTable.tsx';
import { getTableSearchSchema } from '@/shared/schemas.ts';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { StudyPlanListQuery } from '@/features/study-plan/queries.ts';
import { ProgramListQuery } from '@/features/program/queries.ts';
import { Stack, Title } from '@mantine/core';

export const Route = createFileRoute('/_layout/study-plans/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(StudyPlanListQuery);
    queryClient.ensureQueryData(ProgramListQuery);
  },
  validateSearch: getTableSearchSchema(DefaultSearchValues()),
  search: {
    middlewares: [stripSearchParams(DefaultSearchValues())],
  },
});

function RouteComponent() {
  return (
    <Stack gap="lg">
      <Title order={2} fw={600}>
        Study Plans
      </Title>
      <StudyPlansTable />
    </Stack>
  );
}

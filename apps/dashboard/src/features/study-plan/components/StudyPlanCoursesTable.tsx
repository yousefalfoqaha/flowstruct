import { Button, Flex, Group, Paper, Stack, Title } from '@mantine/core';
import { DataTable } from '@/shared/components/DataTable.tsx';
import { StudyPlanCourseAdder } from '@/features/study-plan/components/StudyPlanCourseAdder.tsx';
import { useDataTable } from '@/shared/hooks/useDataTable.ts';
import { DataTablePagination } from '@/shared/components/DataTablePagination.tsx';
import { DataTableSearch } from '@/shared/components/DataTableSearch.tsx';
import { useStudyPlan } from '@/features/study-plan/hooks/useStudyPlan.ts';
import React from 'react';
import { getStudyPlanCoursesTableColumns } from '@/features/study-plan/components/StudyPlanCoursesTableColumns.tsx';
import { getSectionCode } from '@/utils/getSectionCode.ts';
import { FrameworkCourse } from '@/features/study-plan/types.ts';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { useStudyPlanCourses } from '@/features/study-plan/hooks/useStudyPlanCourses.ts';
import { ListPlus, Plus } from 'lucide-react';
import { SelectedCoursesToolbar } from '@/features/study-plan/components/SelectedCoursesToolbar.tsx';
import { SectionColumnFilter } from '@/features/study-plan/components/SectionColumnFilter.tsx';
import { Link } from '@tanstack/react-router';

export function StudyPlanCoursesTable() {
  const { data: studyPlan } = useStudyPlan();
  const { data: courses } = useStudyPlanCourses();

  const data = React.useMemo(() => {
    const rows: FrameworkCourse[] = [];

    studyPlan.sections.forEach((section) => {
      const sectionCode = getSectionCode(section);

      section.courses.forEach((courseId) => {
        const course = courses[Number(courseId)];
        if (!course) return;

        const prerequisites = studyPlan.coursePrerequisites[courseId];
        const corequisites = studyPlan.courseCorequisites[courseId];

        rows.push({
          ...course,
          prerequisites,
          corequisites,
          section: section.id,
          sectionCode: sectionCode,
        });
      });
    });

    return rows;
  }, [studyPlan, courses]);

  const columns = React.useMemo(() => getStudyPlanCoursesTableColumns(), []);

  const table = useDataTable<FrameworkCourse>({
    data,
    columns,
    getRowId: (originalRow) => String(originalRow.id),
    initialState: {
      sorting: [
        {
          id: 'code',
          desc: false,
        },
      ],
      globalFilter: '',
    },
  });

  if (studyPlan.sections.length === 0) {
    return (
      <Paper withBorder shadow="sm">
        <Stack align="center" gap="xs" my={32}>
          <ListPlus size={32} />
          <Title mb="sm" order={2} fw={600}>
            Create New Section
          </Title>
          <Link
            params={{ studyPlanId: String(studyPlan.id) }}
            to="/study-plans/$studyPlanId/sections/new"
          >
            <Button leftSection={<Plus size={18} />}>Create Section</Button>
          </Link>
        </Stack>
      </Paper>
    );
  }

  return (
    <>
      <SelectedCoursesToolbar table={table} studyPlan={studyPlan} />
      <Flex direction={{ base: 'column', lg: 'row' }} gap="lg">
        <Flex direction="column" style={{ flex: 1 }} gap="md">
          <Group>
            <DataTableSearch placeholder="Search courses..." table={table} />

            <SectionColumnFilter table={table} sections={studyPlan.sections} />
          </Group>

          <AppCard
            title="Course List"
            subtitle="Manage all study plan courses"
            headerAction={<StudyPlanCourseAdder />}
          >
            <DataTable table={table} />
          </AppCard>

          <DataTablePagination table={table} />
        </Flex>
      </Flex>
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { PageHeaderWithBack } from '@/shared/components/PageHeaderWithBack.tsx';
import { getCourseDisplayName } from '@/utils/getCourseDisplayName.ts';
import { PageLayout } from '@/shared/components/PageLayout.tsx';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { EditDetailsButton } from '@/shared/components/EditDetailsButton.tsx';
import { Group } from '@mantine/core';
import { InfoItem } from '@/shared/components/InfoItem.tsx';
import { CourseType } from '@/features/course/types.ts';
import { LastUpdated } from '@/shared/components/LastUpdated.tsx';
import { CourseQuery } from '@/features/course/queries.ts';
import { useRouteCourse } from '@/features/course/hooks/useRouteCourse.ts';

export const Route = createFileRoute('/_layout/courses/$courseId/')({
  loader: async ({ context: { queryClient }, params }) => {
    const courseId = Number(params.courseId);
    queryClient.ensureQueryData(CourseQuery(courseId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: course } = useRouteCourse();

  return (
    <PageLayout
      header={
        <Group gap="lg" justify="space-between">
          <PageHeaderWithBack title={getCourseDisplayName(course)} linkProps={{ to: '/courses' }} />
          <LastUpdated at={course.updatedAt} by={course.updatedBy} />
        </Group>
      }
    >
      <AppCard
        title="Course Information"
        subtitle="Details about this course"
        headerAction={
          <EditDetailsButton
            to="/courses/$courseId/edit"
            params={{ courseId: String(course.id) }}
          />
        }
      >
        <Group grow>
          <InfoItem label="Code" value={course.code} />
          <InfoItem label="Name" value={course.name} />
        </Group>

        <Group grow>
          <InfoItem label="Credit Hours" value={course.creditHours} suffix="Cr." />
          <InfoItem label="ECTS" value={course.ects} suffix="ECTS" />
        </Group>

        <Group grow>
          <InfoItem label="Lecture Hours" value={course.lectureHours} suffix="Hrs/Week" />
          <InfoItem label="Practical Hours" value={course.practicalHours} suffix="Hrs/Week" />
        </Group>

        <Group grow>
          <InfoItem
            label="Type"
            value={CourseType[course.type as keyof typeof CourseType] ?? 'Unknown'}
            suffix={`(${course.type})`}
          />
          <InfoItem label="Is Remedial" value={course.isRemedial ? 'Yes' : 'No'} />
        </Group>
      </AppCard>
    </PageLayout>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { PageHeaderWithBack } from '@/shared/components/PageHeaderWithBack.tsx';
import { useCurrentCourse } from '@/features/course/hooks/useCurrentCourse.ts';
import { getCourseDisplayName } from '@/utils/getCourseDisplayName.ts';
import { PageLayout } from '@/shared/components/PageLayout.tsx';
import { EditCourseFieldset } from '@/features/course/components/EditCourseFieldset.tsx';

export const Route = createFileRoute('/_layout/courses/$courseId/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: course } = useCurrentCourse();

  return (
    <PageLayout
      header={
        <PageHeaderWithBack
          title={getCourseDisplayName(course)}
          linkProps={{
            to: '..',
            params: { courseId: String(course.id) },
          }}
        />
      }
    >
      <EditCourseFieldset course={course} />
    </PageLayout>
  );
}

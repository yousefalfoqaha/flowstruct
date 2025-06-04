import { createFileRoute } from '@tanstack/react-router';
import { PageHeaderWithBack } from '@/shared/components/PageHeaderWithBack.tsx';
import { useRouteCourse } from '@/features/course/hooks/useRouteCourse.ts';
import { getCourseDisplayName } from '@/utils/getCourseDisplayName.ts';
import { PageLayout } from '@/shared/components/PageLayout.tsx';
import { EditCourseFieldset } from '@/features/course/components/EditCourseFieldset.tsx';

export const Route = createFileRoute('/_layout/courses/$courseId/edit')({
  component: RouteComponent,
  loader: () => ({ crumb: 'Edit Details' }),
});

function RouteComponent() {
  const { data: course } = useRouteCourse();

  return (
    <PageLayout
      header={
        <PageHeaderWithBack
          title={getCourseDisplayName(course)}
          linkProps={{
            to: '/courses/$courseId',
            params: { courseId: String(course.id) },
          }}
        />
      }
    >
      <EditCourseFieldset course={course} />
    </PageLayout>
  );
}

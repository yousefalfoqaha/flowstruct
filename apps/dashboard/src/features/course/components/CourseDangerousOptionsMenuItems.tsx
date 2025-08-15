import { Menu, Text } from '@mantine/core';
import { CourseSummary } from '@/features/course/types.ts';
import { History, RotateCcw, Trash } from 'lucide-react';
import { useMarkCourseOutdated } from '@/features/course/hooks/useMarkCourseOutdated.ts';
import { useMarkCourseActive } from '@/features/course/hooks/useMarkCourseActive.ts';
import { useDeleteCourse } from '@/features/course/hooks/useDeleteCourse.ts';
import { modals } from '@mantine/modals';
import { useAuth } from '@/shared/hooks/useAuth.ts';

type Props = {
  course: CourseSummary;
};

export function CourseDangerousOptionsMenuItems({ course }: Props) {
  const { mutate: markOutdated } = useMarkCourseOutdated();
  const { mutate: markActive } = useMarkCourseActive();
  const { mutate: deleteCourse } = useDeleteCourse();

  const { hasPermission } = useAuth();

  const handleMarkOutdated = () => {
    modals.openConfirmModal({
      title: 'Mark Course as Outdated',
      children: (
        <Text size="sm">
          Marking this course as outdated will indicate it's no longer in use. Are you sure you want to
          proceed?
        </Text>
      ),
      labels: { confirm: 'Mark Outdated', cancel: 'Cancel' },
      onConfirm: () => markOutdated(course.id),
    });
  };

  const handleMarkActive = () => {
    modals.openConfirmModal({
      title: 'Mark Course as Active',
      children: (
        <Text size="sm">
          Marking this course as active will indicate it's currently in use. Are you sure you want to
          proceed?
        </Text>
      ),
      labels: { confirm: 'Mark Active', cancel: 'Cancel' },
      onConfirm: () => markActive(course.id),
    });
  };

  const handleDeleteCourse = () => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Deleting this course will permanently remove it. This action cannot be undone. Are you absolutely
          sure?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteCourse(course.id),
    });
  };

  return (
    <>
      {course.outdatedAt ? (
        <Menu.Item
          color="green"
          leftSection={<RotateCcw size={14} />}
          onClick={handleMarkActive}
        >
          Mark as Active
        </Menu.Item>
      ) : (
        <Menu.Item 
          color="orange" 
          leftSection={<History size={14} />} 
          onClick={handleMarkOutdated}
        >
          Mark as Outdated
        </Menu.Item>
      )}

      {hasPermission('courses:delete') && (
        <Menu.Item
          color="red"
          leftSection={<Trash size={14} />}
          onClick={handleDeleteCourse}
        >
          Delete
        </Menu.Item>
      )}
    </>
  );
}

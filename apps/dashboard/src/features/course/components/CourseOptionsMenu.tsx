import { ActionIcon, Menu, Text } from '@mantine/core';
import { CourseSummary } from '@/features/course/types.ts';
import { Ellipsis, History, Pencil, RotateCcw, ScrollText } from 'lucide-react';
import { useMarkCourseOutdated } from '@/features/course/hooks/useMarkCourseOutdated.ts';
import { useMarkCourseActive } from '@/features/course/hooks/useMarkCourseActive.ts';
import { modals } from '@mantine/modals';
import { Link } from '@tanstack/react-router';

type Props = {
  course: CourseSummary;
};

export function CourseOptionsMenu({ course }: Props) {
  const { mutate: markOutdated } = useMarkCourseOutdated();
  const { mutate: markActive } = useMarkCourseActive();

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

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <Ellipsis color="gray" size={14} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>

        <Link
          style={{ textDecoration: 'none' }}
          to="/catalog/courses/$courseId"
          params={{ courseId: String(course.id) }}
        >
          <Menu.Item leftSection={<ScrollText size={14} />}>View</Menu.Item>
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to="/catalog/courses/$courseId/edit"
          params={{ courseId: String(course.id) }}
        >
          <Menu.Item leftSection={<Pencil size={14} />}>Edit details</Menu.Item>
        </Link>

        <Menu.Divider />

        {course.outdatedAt ? (
          <Menu.Item
            color="green"
            leftSection={<RotateCcw size={14} />}
            onClick={handleMarkActive}
          >
            Mark active
          </Menu.Item>
        ) : (
          <Menu.Item color="orange" leftSection={<History size={14} />} onClick={handleMarkOutdated}>
            Mark outdated
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

import { ActionIcon, Menu, Text } from '@mantine/core';
import { CourseSummary } from '@/features/course/types.ts';
import { Ellipsis, Pencil, ScrollText, Archive, ArchiveRestore } from 'lucide-react';
import { useArchiveCourse } from '@/features/course/hooks/useArchiveCourse.ts';
import { useUnarchiveCourse } from '@/features/course/hooks/useUnarchiveCourse.ts';
import { modals } from '@mantine/modals';
import { Link } from '@tanstack/react-router';

type Props = {
  course: CourseSummary;
};

export function CourseOptionsMenu({ course }: Props) {
  const { mutate: archiveCourse } = useArchiveCourse();
  const { mutate: unarchiveCourse } = useUnarchiveCourse();

  const handleArchive = () => {
    modals.openConfirmModal({
      title: 'Archive Course',
      children: (
        <Text size="sm">
          Archiving this course will make it unavailable to students. Are you sure you want to proceed?
        </Text>
      ),
      labels: { confirm: 'Archive', cancel: 'Cancel' },
      onConfirm: () => archiveCourse(course.id),
    });
  };

  const handleUnarchive = () => {
    modals.openConfirmModal({
      title: 'Unarchive Course',
      children: (
        <Text size="sm">
          Unarchiving this course will make it available again to students. Are you sure you want to proceed?
        </Text>
      ),
      labels: { confirm: 'Unarchive', cancel: 'Cancel' },
      onConfirm: () => unarchiveCourse(course.id),
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

        {course.deletedAt === null ? (
          <Menu.Item 
            color="orange" 
            leftSection={<Archive size={14} />}
            onClick={handleArchive}
          >
            Archive
          </Menu.Item>
        ) : (
          <Menu.Item 
            color="green" 
            leftSection={<ArchiveRestore size={14} />}
            onClick={handleUnarchive}
          >
            Unarchive
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

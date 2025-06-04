import { ActionIcon, Menu, Text } from '@mantine/core';
import { Ellipsis, Pencil, ScrollText, Trash } from 'lucide-react';
import { useDeleteStudyPlan } from '@/features/study-plan/hooks/useDeleteStudyPlan.ts';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { Link } from '@tanstack/react-router';
import { modals } from '@mantine/modals';

type Props = {
  studyPlan: StudyPlanSummary;
};

export function StudyPlanOptionsMenu({ studyPlan }: Props) {
  const deleteStudyPlan = useDeleteStudyPlan();

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon loading={deleteStudyPlan.isPending} variant="transparent" color="gray">
          <Ellipsis size={14} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>

        <Link
          style={{ textDecoration: 'none' }}
          to="/study-plans/$studyPlanId/details"
          params={{ studyPlanId: String(studyPlan.id) }}
        >
          <Menu.Item leftSection={<ScrollText size={14} />}>View</Menu.Item>
        </Link>

        <Link
          style={{ textDecoration: 'none' }}
          to="/study-plans/$studyPlanId/details/edit"
          params={{ studyPlanId: String(studyPlan.id) }}
        >
          <Menu.Item leftSection={<Pencil size={14} />}>Edit details</Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<Trash size={14} />}
          onClick={() =>
            modals.openConfirmModal({
              title: 'Please confirm your action',
              children: (
                <Text size="sm">
                  Deleting this study plan will delete all of its sections, program map, and
                  overview, are you absolutely sure?
                </Text>
              ),
              labels: { confirm: 'Confirm', cancel: 'Cancel' },
              onConfirm: () => deleteStudyPlan.mutate(studyPlan.id),
            })
          }
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

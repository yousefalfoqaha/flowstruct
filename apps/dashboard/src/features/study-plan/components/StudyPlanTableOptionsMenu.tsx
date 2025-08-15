import { ActionIcon, Menu } from '@mantine/core';
import { Ellipsis, Pencil, ScrollText } from 'lucide-react';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { Link } from '@tanstack/react-router';
import { StudyPlanDangerMenuItems } from '@/features/study-plan/components/StudyPlanDangerMenuItems.tsx';

type Props = {
  studyPlan: StudyPlanSummary;
  onDeleteSuccess?: () => void;
};

export function StudyPlanTableOptionsMenu({ studyPlan, onDeleteSuccess }: Props) {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="transparent" color="gray">
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

        <StudyPlanDangerMenuItems 
          studyPlan={studyPlan} 
          onDeleteSuccess={onDeleteSuccess} 
        />
      </Menu.Dropdown>
    </Menu>
  );
}

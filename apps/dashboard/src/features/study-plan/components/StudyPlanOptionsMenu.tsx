import { ActionIcon, Menu } from '@mantine/core';
import { StudyPlanDangerMenuItems } from '@/features/study-plan/components/StudyPlanDangerMenuItems.tsx';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { EllipsisVertical } from 'lucide-react';

type Props = {
  studyPlan: StudyPlanSummary;
  onDeleteSuccess?: () => void;
};

export function StudyPlanOptionsMenu({ studyPlan, onDeleteSuccess }: Props) {
  return (
    <Menu
      width={200}
      shadow="sm"
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
    >
      <Menu.Target>
        <ActionIcon variant="transparent" color="gray">
          <EllipsisVertical size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>

        <StudyPlanDangerMenuItems 
          studyPlan={studyPlan} 
          onDeleteSuccess={onDeleteSuccess} 
        />
      </Menu.Dropdown>
    </Menu>
  );
}

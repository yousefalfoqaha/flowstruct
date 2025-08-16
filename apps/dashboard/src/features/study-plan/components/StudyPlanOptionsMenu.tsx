import { ActionIcon, Menu } from '@mantine/core';
import { StudyPlanDangerMenuItems } from '@/features/study-plan/components/StudyPlanDangerMenuItems.tsx';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

type Props = {
  studyPlan: StudyPlanSummary;
};

export function StudyPlanOptionsMenu({ studyPlan }: Props) {
  const navigate = useNavigate();

  return (
    <Menu
      width={200}
      shadow="sm"
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      keepMounted
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
          onDeleteSuccess={() => {
            navigate({ to: '/study-plans', search: DefaultSearchValues() });
          }}
        />
      </Menu.Dropdown>
    </Menu>
  );
}

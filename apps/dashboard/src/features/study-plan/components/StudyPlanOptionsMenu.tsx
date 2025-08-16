import { ActionIcon, Menu } from '@mantine/core';
import { StudyPlanDangerMenuItems } from '@/features/study-plan/components/StudyPlanDangerMenuItems.tsx';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { EllipsisVertical, ExternalLink } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { modals } from '@mantine/modals';
import { StudyPlanLinkModalContent } from './StudyPlanLinkModalContent';
import { ModalHeader } from '@/shared/components/ModalHeader.tsx';

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

        <Menu.Item
          leftSection={<ExternalLink size={14} />}
          onClick={() => {
            modals.open({
              size: 'lg',
              title: (
                <ModalHeader
                  title="Student View Link"
                  subtitle="Click the link below to open the student view in a new tab, or use the copy button to share the URL"
                />
              ),
              children: <StudyPlanLinkModalContent studyPlanId={studyPlan.id} />,
            });
          }}
        >
          Student View Link
        </Menu.Item>

        <Menu.Divider />

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

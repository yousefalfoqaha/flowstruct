import { Menu, Text } from '@mantine/core';
import { CircleCheck, ClipboardX, CopyPlus, Trash } from 'lucide-react';
import { useDeleteStudyPlan } from '@/features/study-plan/hooks/useDeleteStudyPlan.ts';
import { useApproveStudyPlanChanges } from '@/features/study-plan/hooks/useApproveStudyPlanChanges.ts';
import { modals } from '@mantine/modals';
import { ModalHeader } from '@/shared/components/ModalHeader.tsx';
import { CloneStudyPlanDetailsFormFields } from '@/features/study-plan/components/CloneStudyPlanDetailsFormFields.tsx';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { useDiscardStudyPlanChanges } from '@/features/study-plan/hooks/useDiscardStudyPlanChanges.ts';

type Props = {
  studyPlan: StudyPlanSummary;
};

export function StudyPlanDangerMenuItems({ studyPlan }: Props) {
  const deleteStudyPlan = useDeleteStudyPlan();
  const approveStudyPlan = useApproveStudyPlanChanges();
  const discardStudyPlan = useDiscardStudyPlanChanges();

  const handleApproveStudyPlan = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Approving these changes will schedule them for publication. Students will see the updated
          study plan within 3 days. This action is final and cannot be undone. Are you sure you want
          to proceed?
        </Text>
      ),
      labels: { confirm: 'Approve Changes', cancel: 'Cancel' },
      onConfirm: () => approveStudyPlan.mutate(studyPlan.id),
    });

  const handleDeleteStudyPlan = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Deleting this study plan will permanently remove all related sections, the program map,
          and its overview. This action cannot be undone. Are you absolutely sure?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => deleteStudyPlan.mutate(studyPlan.id),
    });

  const handleCloneStudyPlan = () =>
    modals.open({
      title: (
        <ModalHeader
          title="Cloned Study Plan Details"
          subtitle="Modify the details of the new cloned study plan"
        />
      ),
      centered: true,
      size: 'lg',
      children: <CloneStudyPlanDetailsFormFields studyPlanToClone={studyPlan} />,
    });

  const discardStudyPlanChanges = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          This will revert the study plan to its last approved version, permanently discarding all
          current draft changes. Are you sure you want to continue?
        </Text>
      ),
      labels: { confirm: 'Discard Changes', cancel: 'Cancel' },
      onConfirm: () => discardStudyPlan.mutate(studyPlan.id),
    });

  return (
    <>
      {(studyPlan.status === 'DRAFT' || studyPlan.status === 'NEW') && (
        <Menu.Item onClick={handleApproveStudyPlan} leftSection={<CircleCheck size={14} />}>
          Approve changes
        </Menu.Item>
      )}

      {studyPlan.status === 'DRAFT' && (
        <Menu.Item leftSection={<ClipboardX size={14} />} onClick={discardStudyPlanChanges}>
          Discard changes
        </Menu.Item>
      )}

      {(studyPlan.status === 'DRAFT' || studyPlan.status === 'NEW') && <Menu.Divider />}

      <Menu.Item leftSection={<CopyPlus size={14} />} onClick={handleCloneStudyPlan}>
        Clone
      </Menu.Item>

      <Menu.Item color="red" onClick={handleDeleteStudyPlan} leftSection={<Trash size={14} />}>
        Delete
      </Menu.Item>
    </>
  );
}

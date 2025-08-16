import { Menu, Text } from '@mantine/core';
import {
  Archive,
  ArchiveRestore,
  CircleCheck,
  ClipboardX,
  CopyPlus,
  Mail,
  Trash,
} from 'lucide-react';
import { useArchiveStudyPlan } from '@/features/study-plan/hooks/useArchiveStudyPlan.ts';
import { useUnarchiveStudyPlan } from '@/features/study-plan/hooks/useUnarchiveStudyPlan.ts';
import { useApproveStudyPlanChanges } from '@/features/study-plan/hooks/useApproveStudyPlanChanges.ts';
import { modals } from '@mantine/modals';
import { ModalHeader } from '@/shared/components/ModalHeader.tsx';
import { CloneStudyPlanDetailsForm } from '@/features/study-plan/components/CloneStudyPlanDetailsForm.tsx';
import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { useDiscardStudyPlanChanges } from '@/features/study-plan/hooks/useDiscardStudyPlanChanges.ts';
import { RequestApprovalForm } from '@/features/study-plan/components/RequestApprovalForm.tsx';
import { useAuth } from '@/shared/hooks/useAuth.ts';
import { useDeleteStudyPlan } from '@/features/study-plan/hooks/useDeleteStudyPlan.ts';

type Props = {
  studyPlan: StudyPlanSummary;
  onDeleteSuccess?: () => void;
};

export function StudyPlanDangerMenuItems({ studyPlan, onDeleteSuccess }: Props) {
  const deleteStudyPlan = useDeleteStudyPlan();
  const archiveStudyPlan = useArchiveStudyPlan();
  const unarchiveStudyPlan = useUnarchiveStudyPlan();
  const approveStudyPlan = useApproveStudyPlanChanges();
  const discardStudyPlan = useDiscardStudyPlanChanges();

  const { hasPermission } = useAuth();

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

  const handleArchiveStudyPlan = () =>
    modals.openConfirmModal({
      title: 'Archive Study Plan',
      children: (
        <Text size="sm">
          Archiving this study plan will make it unavailable to students. Are you sure you want to
          proceed?
        </Text>
      ),
      labels: { confirm: 'Archive', cancel: 'Cancel' },
      onConfirm: () => archiveStudyPlan.mutate(studyPlan.id),
    });

  const handleUnarchiveStudyPlan = () =>
    modals.openConfirmModal({
      title: 'Unarchive Study Plan',
      children: (
        <Text size="sm">
          Unarchiving this study plan will make it available again to students. Are you sure you
          want to proceed?
        </Text>
      ),
      labels: { confirm: 'Unarchive', cancel: 'Cancel' },
      onConfirm: () => unarchiveStudyPlan.mutate(studyPlan.id),
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
      onConfirm: () =>
        deleteStudyPlan.mutate(studyPlan.id, {
          onSuccess: () => {
            if (onDeleteSuccess) {
              onDeleteSuccess();
            }
          },
        }),
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
      children: <CloneStudyPlanDetailsForm studyPlanToClone={studyPlan} />,
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

  const requestStudyPlanApproval = () =>
    modals.open({
      title: (
        <ModalHeader
          title="Request Approval"
          subtitle="Select an approver to send an email to request approval of the study plan's changes"
        />
      ),
      children: <RequestApprovalForm studyPlan={studyPlan} />,
      centered: true,
      size: 'lg',
    });

  const isNewOrDraft = studyPlan.status === 'DRAFT' || studyPlan.status === 'NEW';

  return (
    <>
      {isNewOrDraft && hasPermission('study-plans:approve') && (
        <Menu.Item onClick={handleApproveStudyPlan} leftSection={<CircleCheck size={14} />}>
          Approve changes
        </Menu.Item>
      )}

      {isNewOrDraft && hasPermission('study-plans:request-approval') && (
        <Menu.Item leftSection={<Mail size={14} />} onClick={requestStudyPlanApproval}>
          Request approval
        </Menu.Item>
      )}

      {studyPlan.status === 'DRAFT' && (
        <Menu.Item leftSection={<ClipboardX size={14} />} onClick={discardStudyPlanChanges}>
          Discard changes
        </Menu.Item>
      )}

      {isNewOrDraft &&
        (hasPermission('study-plans:approve') || hasPermission('study-plans:request-approval')) && (
          <Menu.Divider />
        )}

      <Menu.Item leftSection={<CopyPlus size={14} />} onClick={handleCloneStudyPlan}>
        Clone
      </Menu.Item>

      {studyPlan.archivedAt !== null ? (
        <Menu.Item
          color="green"
          onClick={handleUnarchiveStudyPlan}
          leftSection={<ArchiveRestore size={14} />}
        >
          Unarchive
        </Menu.Item>
      ) : (
        <Menu.Item
          color="orange"
          onClick={handleArchiveStudyPlan}
          leftSection={<Archive size={14} />}
        >
          Archive
        </Menu.Item>
      )}

      {hasPermission('study-plans:delete') && (
        <Menu.Item color="red" onClick={handleDeleteStudyPlan} leftSection={<Trash size={14} />}>
          Delete
        </Menu.Item>
      )}
    </>
  );
}

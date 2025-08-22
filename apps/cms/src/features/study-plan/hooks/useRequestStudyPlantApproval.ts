import { api } from '@/shared/api.ts';
import { STUDY_PLAN_ENDPOINT } from '@/features/study-plan/constants.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

const requestApproval = ({
  studyPlanId,
  requestDetails,
}: {
  studyPlanId: number;
  requestDetails: { approver: number; message: string };
}) =>
  api.post<void>([STUDY_PLAN_ENDPOINT, studyPlanId, 'request-approval'], {
    body: requestDetails,
  });

export const useRequestStudyPlantApproval = () =>
  useAppMutation({
    mutationFn: requestApproval,
    meta: {
      successMessage: 'Approval request email sent.',
    },
  });

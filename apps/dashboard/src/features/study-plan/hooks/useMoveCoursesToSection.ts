import { useQueryClient } from '@tanstack/react-query';
import { moveCoursesToSection } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useMoveCoursesToSection = () => {
  const queryClient = useQueryClient();

  return useAppMutation(moveCoursesToSection, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
    successNotification: { message: 'Course(s) sections changed.' },
  });
};

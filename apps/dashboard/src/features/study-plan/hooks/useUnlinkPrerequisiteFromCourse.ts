import { useQueryClient } from '@tanstack/react-query';
import { unlinkPrerequisiteFromCourse } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useUnlinkPrerequisiteFromCourse = () => {
  const queryClient = useQueryClient();
  return useAppMutation(unlinkPrerequisiteFromCourse, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
  });
};

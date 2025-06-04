import { useQueryClient } from '@tanstack/react-query';
import { linkCorequisitesToCourse } from '@/features/study-plan/api.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';

export const useLinkCorequisitesToCourse = () => {
  const queryClient = useQueryClient();

  return useAppMutation(linkCorequisitesToCourse, {
    onSuccess: (data) => {
      queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: studyPlanKeys.list() });
    },
  });
};

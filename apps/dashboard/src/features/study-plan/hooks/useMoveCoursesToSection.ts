import { STUDY_PLAN_ENDPOINT } from '@/features/study-plan/constants.ts';
import { studyPlanKeys } from '@/features/study-plan/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';
import { StudyPlan } from '@/features/study-plan/types.ts';

const moveCoursesToSection = ({
  studyPlanId,
  courseIds,
  targetSectionId,
}: {
  studyPlanId: number;
  courseIds: number[];
  targetSectionId: number;
}) =>
  api.put<StudyPlan>(
    [STUDY_PLAN_ENDPOINT, studyPlanId, 'sections', targetSectionId, 'move-courses'],
    {
      params: {
        courses: courseIds,
      },
    }
  );

export const useMoveCoursesToSection = () =>
  useAppMutation({
    mutationFn: moveCoursesToSection,
    meta: {
      setData: (data) => studyPlanKeys.detail(data.id),
      invalidates: [studyPlanKeys.list()],
      successMessage: 'Course(s) sections changed.',
    },
  });

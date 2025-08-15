import { Button, Fieldset, LoadingOverlay, Stack } from '@mantine/core';
import { courseSchema } from '@/features/course/schemas.ts';
import { CourseFields } from '@/features/course/components/CourseFields.tsx';
import { Plus } from 'lucide-react';
import { useCoursePreset } from '@/features/course/hooks/useCoursePreset.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { customResolver } from '@/utils/customResolver.ts';
import { useCourse } from '@/features/course/hooks/useCourse.ts';
import { modals } from '@mantine/modals';
import { useEditCourseDetails } from '@/features/course/hooks/useEditCourseDetails.ts';
import { canSubmit } from '@/utils/canSubmit';

interface Props {
  courseId: number;
}

export function EditCourseForm({ courseId }: Props) {
  const { data: course, isPending } = useCourse(courseId);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: customResolver(courseSchema),
    defaultValues: course ?? {},
  });
  const { preset, changePreset } = useCoursePreset(form);
  const editCourseDetails = useEditCourseDetails();

  const onSubmit = form.handleSubmit((data) => {
    editCourseDetails.mutate(
      { courseId: courseId, courseDetails: data },
      {
        onSuccess: () => {
          modals.closeAll();
        },
      }
    );
  });

  if (isPending) return <LoadingOverlay visible zIndex={1000} loaderProps={{ type: 'bars' }} />;

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Fieldset legend="Course Details">
          <CourseFields form={form} preset={preset} changePreset={changePreset} />
        </Fieldset>

        <Button
          disabled={!canSubmit(form)}
          leftSection={<Plus size={18} />}
          type="submit"
          loading={editCourseDetails.isPending}
          fullWidth
        >
          Save Changes
        </Button>
      </Stack>
    </form>
  );
}

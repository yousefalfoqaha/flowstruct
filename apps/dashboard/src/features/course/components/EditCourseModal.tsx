import { Button, Fieldset, Stack } from '@mantine/core';
import { courseDetailsSchema } from '@/features/course/schemas.ts';
import { CourseDetailsFormFields } from '@/features/course/components/CourseDetailsFormFields.tsx';
import { Plus } from 'lucide-react';
import { useCoursePreset } from '@/features/course/hooks/useCoursePreset.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { customResolver } from '@/utils/customResolver.ts';
import { useCourse } from '@/features/course/hooks/useCourse.ts';
import { modals } from '@mantine/modals';
import { useEditCourseDetails } from '@/features/course/hooks/useEditCourseDetails.ts';

interface Props {
  courseId: number;
}

export function EditCourseModal({ courseId }: Props) {
  const { data: course, isPending } = useCourse(courseId);

  if (isPending) return 'Loading...';

  const form = useForm<z.infer<typeof courseDetailsSchema>>({
    resolver: customResolver(courseDetailsSchema),
    defaultValues: { ...course },
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

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Fieldset>
          <CourseDetailsFormFields form={form} preset={preset} changePreset={changePreset} />
        </Fieldset>

        <Button
          disabled={!form.formState.isValid}
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

import { Course } from '@/features/course/types.ts';
import { useAppForm } from '@/shared/hooks/useAppForm.ts';
import { courseDetailsSchema } from '@/features/course/schemas.ts';
import { useEditCourseDetails } from '@/features/course/hooks/useEditCourseDetails.ts';
import { useNavigate } from '@tanstack/react-router';
import { CourseDetailsFormFields } from '@/features/course/components/CourseDetailsFormFields.tsx';
import { Box, Button } from '@mantine/core';
import { Pencil } from 'lucide-react';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { useCoursePreset } from '@/features/course/hooks/useCoursePreset.ts';

type Props = {
  course: Course;
};

export function EditCourseFieldset({ course }: Props) {
  const form = useAppForm(courseDetailsSchema, { ...course });
  const { preset, changePreset } = useCoursePreset(form);
  const editCourseDetails = useEditCourseDetails();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit((data) => {
    editCourseDetails.mutate(
      {
        courseId: course.id,
        courseDetails: data,
      },
      {
        onSuccess: () =>
          navigate({
            to: '/courses/$courseId',
            params: { courseId: String(course.id) },
          }),
      }
    );
  });

  const footer = (
    <Box ml="auto">
      <Button
        loading={editCourseDetails.isPending}
        type="submit"
        leftSection={<Pencil size={18} />}
      >
        Save Details
      </Button>
    </Box>
  );

  return (
    <form onSubmit={onSubmit}>
      <AppCard
        title="Course Information"
        subtitle="Update the details for this course"
        footer={footer}
      >
        <CourseDetailsFormFields form={form} preset={preset} changePreset={changePreset} />
      </AppCard>
    </form>
  );
}

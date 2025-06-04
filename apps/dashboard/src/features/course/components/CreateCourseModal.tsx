import { Button, LoadingOverlay, Modal, Stack } from '@mantine/core';
import { useCreateCourse } from '@/features/course/hooks/useCreateCourse.ts';
import { courseDetailsSchema } from '@/features/course/schemas.ts';
import { CourseDetailsFormFields } from '@/features/course/components/CourseDetailsFormFields.tsx';
import { Plus } from 'lucide-react';
import { Course } from '@/features/course/types.ts';
import { getCoursePresetSettings } from '@/utils/getCoursePresetSettings.ts';
import { useCoursePreset } from '@/features/course/hooks/useCoursePreset.ts';
import { useAppForm } from '@/shared/hooks/useAppForm.ts';

interface CreateCourseModalProps {
  opened: boolean;
  setOpened: (open: boolean) => void;
  openCourseSearch: () => void;
  selectCreatedCourse: (course: Course) => void;
}

export function CreateCourseModal({
  opened,
  setOpened,
  openCourseSearch,
  selectCreatedCourse,
}: CreateCourseModalProps) {
  const form = useAppForm(courseDetailsSchema, {
    code: '',
    name: '',
    isRemedial: false,
    ...getCoursePresetSettings('lecture'),
  });
  const { preset, changePreset } = useCoursePreset(form);
  const createCourse = useCreateCourse();

  const handleClose = () => {
    setOpened(false);
    openCourseSearch();
    form.reset();
  };

  const onSubmit = form.handleSubmit((data) => {
    createCourse.mutate(data, {
      onSuccess: (newCourse) => {
        selectCreatedCourse(newCourse);
        handleClose();
      },
    });
  });

  return (
    <Modal opened={opened} onClose={handleClose} title="Create Course" centered>
      <form onSubmit={onSubmit}>
        <Stack>
          <LoadingOverlay
            visible={createCourse.isPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <CourseDetailsFormFields form={form} preset={preset} changePreset={changePreset} />
          <Button leftSection={<Plus size={18} />} type="submit" fullWidth mt="md">
            Create and Select Course
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

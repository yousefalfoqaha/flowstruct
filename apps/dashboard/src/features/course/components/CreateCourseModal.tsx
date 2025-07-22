import { Button, Modal, Stack } from '@mantine/core';
import { useCreateCourse } from '@/features/course/hooks/useCreateCourse.ts';
import { courseDetailsSchema } from '@/features/course/schemas.ts';
import { CourseDetailsFormFields } from '@/features/course/components/CourseDetailsFormFields.tsx';
import { Plus } from 'lucide-react';
import { Course } from '@/features/course/types.ts';
import { getCoursePresetSettings } from '@/utils/getCoursePresetSettings.ts';
import { PresetType, useCoursePreset } from '@/features/course/hooks/useCoursePreset.ts';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { customResolver } from '@/utils/customResolver.ts';

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
  const INITIAL_PRESET: PresetType = 'lecture';
  const defaultValues: Partial<Course> = {
    code: '',
    name: '',
    isRemedial: false,
    ects: 0,
    ...getCoursePresetSettings(INITIAL_PRESET),
  };

  const form = useForm<z.infer<typeof courseDetailsSchema>>({
    resolver: customResolver(courseDetailsSchema),
    defaultValues,
  });
  const { preset, changePreset } = useCoursePreset(form);
  const createCourse = useCreateCourse();

  const handleClose = () => {
    form.reset(defaultValues);
    changePreset(INITIAL_PRESET);
    setOpened(false);
    openCourseSearch();
  };

  const onSubmit = form.handleSubmit((data) => {
    createCourse.mutate(data, {
      onSuccess: (newCourse) => {
        handleClose();
        selectCreatedCourse(newCourse);
      },
    });
  });

  return (
    <Modal size="xl" opened={opened} onClose={handleClose} title="Create Course" centered>
      <form onSubmit={onSubmit}>
        <Stack>
          <CourseDetailsFormFields form={form} preset={preset} changePreset={changePreset} />
          <Button
            disabled={!form.formState.isValid}
            leftSection={<Plus size={18} />}
            type="submit"
            loading={createCourse.isPending}
            fullWidth
            mt="md"
          >
            Create and Select Course
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

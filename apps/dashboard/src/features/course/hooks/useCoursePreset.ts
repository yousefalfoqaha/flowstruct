import { getCoursePresetSettings } from '@/utils/getCoursePresetSettings.ts';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod/v4';
import { courseDetailsSchema } from '@/features/course/schemas.ts';

export type PresetType = 'lecture' | 'lab' | 'custom';

const presetSchema = courseDetailsSchema.pick({
  creditHours: true,
  lectureHours: true,
  practicalHours: true,
  type: true,
});

type PresetFields = z.infer<typeof presetSchema>;

export const useCoursePreset = (form: UseFormReturn<z.infer<typeof courseDetailsSchema>>) => {
  const [preset, setPreset] = React.useState<PresetType>('lecture');

  const changePreset = (value: string) => {
    setPreset(value as PresetType);
    form.reset((prevValues) => ({
      ...prevValues,
      ...getCoursePresetSettings(value as PresetType),
    }));
  };

  React.useEffect(() => {
    const subscription = form.watch((_, { name, type }) => {
      if (type !== 'change') return;

      const presetFields = Object.keys(presetSchema.keyof());

      const presetFieldsModified = presetFields.includes(name as keyof PresetFields);
      if (presetFieldsModified) setPreset('custom');
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  return { preset, changePreset };
};

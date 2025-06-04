import { Group, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { Controller, UseFormReturn } from 'react-hook-form';
import { SectionLevel, SectionType } from '@/features/study-plan/types.ts';
import { GraduationCap, Tag, University } from 'lucide-react';
import { sectionDetailsSchema } from '@/features/study-plan/schemas.ts';
import { z } from 'zod';

type Props = {
  form: UseFormReturn<z.infer<typeof sectionDetailsSchema>>;
};

export function SectionDetailsFormFields({ form }: Props) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Stack gap="md">
      <Group grow>
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <Select
              label="Level"
              placeholder="Select a level"
              {...field}
              data={Object.entries(SectionLevel).map(([key, value]) => ({
                value: key,
                label: value,
              }))}
              error={errors.level?.message}
              leftSection={<University size={18} />}
              withAsterisk
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              label="Type"
              placeholder="Select a type"
              {...field}
              data={Object.entries(SectionType).map(([key, value]) => ({
                value: key,
                label: value,
              }))}
              error={errors.type?.message}
              withAsterisk
              leftSection={<Tag size={18} />}
            />
          )}
        />
      </Group>

      <Controller
        name="requiredCreditHours"
        control={control}
        render={({ field }) => (
          <NumberInput
            label="Required Cr. Hrs"
            {...field}
            min={0}
            error={errors.requiredCreditHours?.message}
            withAsterisk
            autoComplete="off"
            suffix=" Cr."
            leftSection={<GraduationCap size={18} />}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            description="An optional name for clarity"
            {...field}
            autoComplete="off"
            error={errors.name?.message}
          />
        )}
      />
    </Stack>
  );
}

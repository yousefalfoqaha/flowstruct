import { Controller, UseFormReturn } from 'react-hook-form';
import { Flex, NumberInput, Select, Stack, TextInput } from '@mantine/core';
import { Calendar, Timer } from 'lucide-react';
import { YearPickerInput } from '@mantine/dates';
import { studyPlanDetailsSchema } from '@/features/study-plan/schemas.ts';
import { z } from 'zod/v4';
import { useProgramList } from '@/features/program/hooks/useProgramList.ts';
import { getProgramDisplayName } from '@/utils/getProgramDisplayName.ts';

type Props = {
  form: UseFormReturn<z.infer<typeof studyPlanDetailsSchema>>;
  disableProgramSelect?: boolean;
};

export function StudyPlanDetailsFormFields({ form, disableProgramSelect = false }: Props) {
  const {
    control,
    formState: { errors },
  } = form;
  const { data: programs } = useProgramList();

  return (
    <Stack>
      <Controller
        name="program"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Pick a program"
            label="Program"
            data={programs.map((p) => ({
              value: String(p.id),
              label: getProgramDisplayName(p),
            }))}
            withAsterisk
            {...field}
            w="100%"
            searchable
            disabled={disableProgramSelect}
            description={
              disableProgramSelect && "Can't change program, make a new study plan instead"
            }
          />
        )}
      />

      <Flex gap="md">
        <Controller
          name="year"
          control={control}
          render={({ field }) => {
            return (
              <YearPickerInput
                label="Year"
                placeholder={new Date().getFullYear().toString()}
                {...field}
                error={errors.year?.message}
                leftSection={<Calendar size={18} />}
                withAsterisk
                w="100%"
              />
            );
          }}
        />

        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Duration"
              autoComplete="off"
              placeholder="In years"
              allowNegative={false}
              {...field}
              error={errors.duration?.message}
              suffix={` ${field.value === 1 ? 'Year' : 'Years'}`}
              leftSection={<Timer size={18} />}
              withAsterisk
              w="100%"
            />
          )}
        />
      </Flex>

      <Flex gap="md">
        <Controller
          name="track"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Track Name"
              placeholder='Eg. "General Track"'
              autoComplete="off"
              {...field}
              error={errors.track?.message}
              w="100%"
            />
          )}
        />
      </Flex>
    </Stack>
  );
}

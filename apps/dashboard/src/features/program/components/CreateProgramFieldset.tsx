import { Button } from '@mantine/core';
import { ProgramDetailsFormFields } from '@/features/program/components/ProgramDetailsFormFields.tsx';
import { programDetailsSchema } from '@/features/program/schemas.ts';
import { useCreateProgram } from '@/features/program/hooks/useCreateProgram.ts';
import { Link, useNavigate } from '@tanstack/react-router';
import { Plus, X } from 'lucide-react';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { useAppForm } from '@/shared/hooks/useAppForm.ts';
import { getDefaultSearchValues } from '@/utils/getDefaultSearchValues.ts';

export function CreateProgramFieldset() {
  const form = useAppForm(programDetailsSchema, {
    code: '',
    name: '',
  });
  const createProgram = useCreateProgram();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit((data) => {
    createProgram.mutate(data, {
      onSuccess: () => {
        form.reset();
        navigate({
          to: '/programs',
          search: getDefaultSearchValues(),
        });
      },
    });
  });

  const footer = (
    <>
      <Link search={getDefaultSearchValues()} to="/programs">
        <Button variant="default" leftSection={<X size={18} />}>
          Cancel
        </Button>
      </Link>

      <Button type="submit" leftSection={<Plus size={18} />} loading={createProgram.isPending}>
        Save Program
      </Button>
    </>
  );

  return (
    <form onSubmit={onSubmit}>
      <AppCard
        title="Program Details"
        subtitle="Enter the details for the new program"
        footer={footer}
      >
        <ProgramDetailsFormFields form={form} />
      </AppCard>
    </form>
  );
}

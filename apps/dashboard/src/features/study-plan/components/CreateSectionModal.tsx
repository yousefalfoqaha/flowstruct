import { useCreateSection } from '@/features/study-plan/hooks/useCreateSection.ts';
import { sectionDetailsSchema } from '@/features/study-plan/schemas.ts';
import { Button, Flex, LoadingOverlay, Modal } from '@mantine/core';
import { SectionDetailsFormFields } from '@/features/study-plan/components/SectionDetailsFormFields.tsx';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from 'lucide-react';
import { useAppForm } from '@/shared/hooks/useAppForm.ts';

type Props = {
  studyPlanId: number;
};

export function CreateSectionModal({ studyPlanId }: Props) {
  const form = useAppForm(sectionDetailsSchema, {
    name: '',
    requiredCreditHours: 0,
  });
  const createSection = useCreateSection();
  const [opened, { open, close }] = useDisclosure(false);

  const handleClose = () => {
    form.reset();
    close();
  };

  const onSubmit = form.handleSubmit((data) => {
    createSection.mutate(
      {
        studyPlanId: studyPlanId,
        sectionDetails: data,
      },
      {
        onSuccess: handleClose,
      }
    );
  });

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Create Section" centered>
        <form onSubmit={onSubmit}>
          <Flex gap="md" direction="column">
            <LoadingOverlay
              visible={createSection.isPending}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />

            <SectionDetailsFormFields form={form} />

            <Button leftSection={<Plus size={18} />} type="submit" fullWidth mt="md">
              Create Section
            </Button>
          </Flex>
        </form>
      </Modal>

      <Button
        size="compact-sm"
        pr={0}
        p={0}
        onClick={open}
        leftSection={<Plus size={14} />}
        variant="transparent"
      >
        Create Section
      </Button>
    </>
  );
}

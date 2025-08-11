import { StudyPlanSummary } from '@/features/study-plan/types.ts';
import { useProgram } from '@/features/program/hooks/useProgram.ts';
import { Controller, useForm } from 'react-hook-form';
import { customResolver } from '@/utils/customResolver.ts';
import { z } from 'zod/v4';
import { requestApprovalSchema } from '@/features/study-plan/schemas.ts';
import {
  Avatar,
  Button,
  Card,
  Fieldset,
  Group,
  LoadingOverlay,
  Select,
  SelectProps,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { getProgramDisplayName } from '@/utils/getProgramDisplayName.ts';
import { getStudyPlanDisplayName } from '@/utils/getStudyPlanDisplayName.ts';
import { Check, FileText, Send, UserCheck, X } from 'lucide-react';
import { modals } from '@mantine/modals';
import { StatusBadge } from '@/shared/components/StatusBadge.tsx';
import classes from '@/features/study-plan/styles/ApprovalStudyPlanCard.module.css';
import { useUserList } from '@/features/user/hooks/useUserList.ts';
import { useRequestStudyPlantApproval } from '@/features/study-plan/hooks/useRequestStudyPlantApproval.ts';

type Props = {
  studyPlan: StudyPlanSummary;
};

type ApproverOption = {
  label: string;
  value: string;
  email: string;
};

export function RequestApprovalForm({ studyPlan }: Props) {
  const form = useForm<z.infer<typeof requestApprovalSchema>>({
    resolver: customResolver(requestApprovalSchema),
    defaultValues: {
      message: '',
    },
  });
  const { data: program } = useProgram(studyPlan.program);
  const { data: users } = useUserList();

  const requestApproval = useRequestStudyPlantApproval();

  const onSubmit = form.handleSubmit((data) => {
    requestApproval.mutate(
      {
        studyPlanId: studyPlan.id,
        requestDetails: {
          message: data.message ? data.message : '',
          approver: Number(data.approver),
        },
      },
      {
        onSuccess: () => {
          modals.closeAll();
        },
      }
    );
  });

  const approvers = Object.values(users)
    .filter((u) => u.role === 'APPROVER')
    .map((u) => {
      return {
        label: u.username,
        value: String(u.id),
        email: u.email,
      } as ApproverOption;
    });
  if (!program) {
    return <LoadingOverlay visible={!program} zIndex={1000} loaderProps={{ type: 'bars' }} />;
  }

  const renderApprover: SelectProps['renderOption'] = ({ option, checked }) => {
    const approverOption = option as unknown as ApproverOption;

    return (
      <Group justify="space-between" w="100%">
        <Group>
          <Avatar size={36} radius="xl" />

          <div>
            <Text size="sm">{approverOption.label}</Text>

            <Text size="xs" c="dimmed">
              {approverOption.email}
            </Text>
          </div>
        </Group>

        {checked && <Check color="gray" size={18} />}
      </Group>
    );
  };
  const StudyPlanCard = () => (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Group gap="xs" align="center">
            <FileText size={20} />

            <Text size="sm" fw={600}>
              Approval Request
            </Text>
          </Group>

          {StatusBadge(studyPlan.status)}
        </Group>

        <Stack gap={2}>
          <Title order={5} fw={600} c="black">
            {getProgramDisplayName(program)}
          </Title>

          <Text c="dimmed" size="sm">
            {getStudyPlanDisplayName(studyPlan)}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <StudyPlanCard />

        <Fieldset legend="Request Details">
          <Stack>
            <Controller
              name="approver"
              control={form.control}
              render={({ field }) => (
                <Select
                  comboboxProps={{
                    shadow: 'sm',
                  }}
                  data={approvers}
                  leftSection={<UserCheck size={18} />}
                  placeholder="Pick an approver"
                  label="Approver"
                  renderOption={renderApprover}
                  withAsterisk
                  nothingFoundMessage="No approvers found."
                  {...field}
                  w="100%"
                  searchable
                />
              )}
            />

            <Controller
              name="message"
              control={form.control}
              render={({ field }) => (
                <Textarea
                  placeholder="Provide additional information or context about the changes (optional)"
                  label="Message"
                  {...field}
                  resize="vertical"
                  autosize
                />
              )}
            />
          </Stack>
        </Fieldset>

        <Group justify="space-between">
          <Button variant="default" leftSection={<X size={18} />} onClick={() => modals.closeAll()}>
            Cancel
          </Button>
          <Button
            type="submit"
            leftSection={<Send size={18} />}
            loading={requestApproval.isPending}
            disabled={!form.formState.isValid}
          >
            Send Email
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

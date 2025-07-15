import React from 'react';
import { useProgramList } from '@/features/program/hooks/useProgramList.ts';
import { useStudyPlanList } from '@/features/study-plan/hooks/useStudyPlanList.ts';
import { getStudyPlanRows } from '@/utils/getStudyPlanRows.ts';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Globe } from 'lucide-react';

export function PublishStudyPlansModal() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const { data: programs } = useProgramList();
  const { data: studyPlans } = useStudyPlanList();
  const drafts = React.useMemo(() => studyPlans.filter((sp) => !sp.isPublished), [studyPlans]);
  const rows = React.useMemo(() => getStudyPlanRows(drafts, programs), [drafts, programs]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const draftCount = selectedIds.size;
  const tooltip = draftCount ? `${draftCount} selected` : 'Select study plans to publish';

  return (
    <>
      <Tooltip label={tooltip} withArrow>
        <Button
          leftSection={<Globe size={18} />}
          variant="outline"
          disabled={!rows.length}
          onClick={() => setModalOpen(true)}
        >
          {rows.length ? 'Publish Study Plans' : 'Published'}
        </Button>
      </Tooltip>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          <div>
            <Title order={4}>Publish Draft Study Plans</Title>
            <Text size="sm" c="dimmed">
              Select the drafts you want to publish
            </Text>
          </div>
        }
        size="lg"
        centered
      >
        <Stack>
          <Button
            variant="filled"
            leftSection={<Globe size={16} />}
            disabled={!draftCount}
            onClick={() => {
              /* publish logic using Array.from(selectedIds) */
            }}
          >
            Publish {draftCount} Draft(s)
          </Button>

          <Divider />

          <ScrollArea h={250}>
            <Stack>
              {rows.map((plan) => {
                const id = String(plan.id);
                const isChecked = selectedIds.has(id);
                return (
                  <Card key={id} withBorder shadow="sm" padding="md">
                    <Group>
                      <Checkbox checked={isChecked} onChange={() => toggle(id)} size="sm" />
                      <Box>
                        <Text>{plan.programName}</Text>
                        <Text size="sm" c="dimmed">
                          {plan.year} - {plan.year + 1}
                          {plan.track && ` | ${plan.track}`}
                        </Text>
                      </Box>
                    </Group>
                  </Card>
                );
              })}
              {!rows.length && (
                <Text ta="center" c="dimmed">
                  No draft study plans found.
                </Text>
              )}
            </Stack>
          </ScrollArea>
        </Stack>
      </Modal>
    </>
  );
}

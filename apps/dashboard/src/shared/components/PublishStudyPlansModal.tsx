import React from 'react';
import { useProgramList } from '@/features/program/hooks/useProgramList.ts';
import { useStudyPlanList } from '@/features/study-plan/hooks/useStudyPlanList.ts';
import { getStudyPlanRows } from '@/utils/getStudyPlanRows.ts';
import {
  Box,
  Button,
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
import { Globe, X } from 'lucide-react';

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

  const handlePublish = () => {
    // publish logic using Array.from(selectedIds)
    console.log('Publishing:', Array.from(selectedIds));
  };

  const draftCount = selectedIds.size;
  const tooltip = 'Publish updated study plan drafts';

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
          <Box>
            <Title order={4} fw={600} lh="md">
              Publish Draft Study Plans
            </Title>
            <Text size="xs" c="dimmed">
              Select the drafts you want to publish
            </Text>
          </Box>
        }
        size="lg"
        centered
      >
        <Stack>
          <Divider />

          <ScrollArea.Autosize mah={350}>
            <Stack>
              {rows.map((plan) => {
                const id = String(plan.id);
                const isChecked = selectedIds.has(id);

                return (
                  <Group
                    key={id}
                    gap="md"
                    wrap="nowrap"
                    p="sm"
                    style={{
                      borderRadius: '8px',
                      backgroundColor: isChecked ? 'var(--mantine-color-blue-0)' : 'transparent',
                      border: isChecked
                        ? '1px solid var(--mantine-color-blue-2)'
                        : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => toggle(id)}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggle(id)}
                      size="sm"
                      style={{ pointerEvents: 'none' }}
                    />

                    <Box flex={1}>
                      <Text lh="xl">
                        {plan.programName}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {plan.year} - {plan.year + 1}
                        {plan.track && ` • ${plan.track}`}
                      </Text>
                    </Box>
                  </Group>
                );
              })}

              {!rows.length && (
                <Box ta="center" py="xl">
                  <Text c="dimmed" size="sm">
                    No draft study plans found.
                  </Text>
                </Box>
              )}
            </Stack>
          </ScrollArea.Autosize>

          <Divider />

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {draftCount > 0 && `${draftCount} draft(s) selected`}
            </Text>

            <Group gap="sm">
              <Button
                leftSection={<X size={16} />}
                variant="default"
                onClick={() => {
                  setSelectedIds(new Set());
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="filled"
                leftSection={<Globe size={16} />}
                disabled={!draftCount}
                onClick={handlePublish}
              >
                Publish Draft(s)
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

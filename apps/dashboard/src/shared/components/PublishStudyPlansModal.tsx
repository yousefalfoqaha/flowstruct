import React from 'react';
import { useProgramList } from '@/features/program/hooks/useProgramList.ts';
import { useStudyPlanList } from '@/features/study-plan/hooks/useStudyPlanList.ts';
import { getStudyPlanRows } from '@/utils/getStudyPlanRows.ts';
import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { Globe, X } from 'lucide-react';
import classes from '@/shared/components/PublishStudyPlanModal.module.css';
import { usePublishStudyPlans } from '@/features/study-plan/hooks/usePublishStudyPlans.ts';

export function PublishStudyPlansModal() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedStudyPlans, setSelectedStudyPlans] = React.useState<Set<number>>(new Set());

  const { data: programs } = useProgramList();
  const { data: studyPlans } = useStudyPlanList();
  const publishStudyPlans = usePublishStudyPlans();

  const drafts = React.useMemo(() => studyPlans.filter((sp) => !sp.isPublished), [studyPlans]);
  const rows = React.useMemo(() => getStudyPlanRows(drafts, programs), [drafts, programs]);

  const toggle = (studyPlanId: number) => {
    setSelectedStudyPlans((prev) => {
      const next = new Set(prev);
      next.has(studyPlanId) ? next.delete(studyPlanId) : next.add(studyPlanId);
      return next;
    });
  };

  const handlePublish = () => {
    publishStudyPlans.mutate(Array.from(selectedStudyPlans), {
      onSuccess: () => {
        setSelectedStudyPlans(new Set());
        setModalOpen(false);
      },
    });
  };

  const draftCount = selectedStudyPlans.size;
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
          {rows.length ? 'Publish Study Plans' : 'Study Plans Published'}
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
          <div className={classes.draftList}>
            <ScrollArea.Autosize mah={500}>
              {rows.map((plan) => {
                const id = plan.id;
                const isChecked = selectedStudyPlans.has(id);

                return (
                  <Group
                    key={id}
                    gap="md"
                    wrap="nowrap"
                    p="sm"
                    style={{
                      backgroundColor: isChecked
                        ? 'var(--mantine-color-blue-light)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
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
                      <Text lh="xl">{plan.programName}</Text>
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
            </ScrollArea.Autosize>
          </div>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              {draftCount > 0 && `${draftCount} draft(s) selected`}
            </Text>

            <Group gap="sm">
              <Button
                leftSection={<X size={16} />}
                variant="default"
                onClick={() => {
                  setSelectedStudyPlans(new Set());
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
                loading={publishStudyPlans.isPending}
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

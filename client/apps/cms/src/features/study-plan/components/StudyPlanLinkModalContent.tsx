import { Anchor, Button, CopyButton, Group, Stack } from '@mantine/core';
import { Copy, ExternalLink } from 'lucide-react';

type Props = {
  studyPlanId: number;
};

export function StudyPlanLinkModalContent({ studyPlanId }: Props) {
  const studentUrl = `${import.meta.env.VITE_STUDENT_BASE_URL}/study-plans/${studyPlanId}`;

  return (
    <Stack>
      <Group justify="space-between">
        <Group>
          <ExternalLink color="gray" size={14} />
          <Anchor style={{ flex: 1 }} href={studentUrl} target="_blank" rel="noopener noreferrer">
            {studentUrl}
          </Anchor>
        </Group>
        <CopyButton value={studentUrl}>
          {({ copied, copy }) => (
            <Button
              leftSection={copied ? null : <Copy size={18} />}
              color={copied ? 'teal' : 'blue'}
              onClick={copy}
            >
              {copied ? 'Copied' : 'Copy URL'}
            </Button>
          )}
        </CopyButton>
      </Group>
    </Stack>
  );
}

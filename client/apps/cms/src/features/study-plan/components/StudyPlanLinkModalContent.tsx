import { Anchor, Button, CopyButton, Group, Stack } from '@mantine/core';
import { Copy, ExternalLink } from 'lucide-react';
import { STUDY_PLAN_ENDPOINT } from '@/features/study-plan/constants.ts';

const CONTENT_DOMAIN = import.meta.env.VITE_CONTENT_DOMAIN;
const SECURE = import.meta.env.VITE_SECURE;
const PROTOCOL = SECURE ? 'https' : 'http';

type Props = {
  studyPlanId: number;
};

export function StudyPlanLinkModalContent({ studyPlanId }: Props) {
  const link = `${PROTOCOL}://${CONTENT_DOMAIN}${STUDY_PLAN_ENDPOINT}/${studyPlanId}`;

  return (
    <Stack>
      <Group justify="space-between">
        <Group>
          <ExternalLink color="gray" size={14} />
          <Anchor style={{ flex: 1 }} href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </Anchor>
        </Group>
        <CopyButton value={link}>
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

import { History } from 'lucide-react';
import { Group, Text } from '@mantine/core';
import { formatTimeAgo } from '@/utils/formatTimeAgo.ts';

type Props = {
  updatedAt: Date;
}

export function LastUpdated({updatedAt}: Props) {
  return (
    <Group gap="xs">
      <History size={14} color="gray" />
      <Text c="dimmed" size="sm">
        Last Update: {formatTimeAgo(new Date(updatedAt))}
      </Text>
    </Group>
  );
}

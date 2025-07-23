import { Text, Title } from '@mantine/core';

type Props = {
  title: string;
  subtitle: string;
};

export function ModalHeader({ title, subtitle }: Props) {
  return (
    <div>
      <Title order={4} fw={600} lh="md">
        {title}
      </Title>
      <Text size="xs" c="dimmed">
        {subtitle}
      </Text>
    </div>
  );
}

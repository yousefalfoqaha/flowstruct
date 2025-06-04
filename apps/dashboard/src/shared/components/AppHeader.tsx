import { Divider, Group, Image } from '@mantine/core';
import { AppBreadcrumbs } from '@/shared/components/AppBreadcrumbs.tsx';
import { ReactElement } from 'react';

type AppHeaderProps = {
  burger: ReactElement;
};

export function AppHeader({ burger }: AppHeaderProps) {
  return (
    <Group justify="space-between" style={{ height: '100%' }}>
      <Group gap="xl" wrap="nowrap">
        {burger}
        <Divider orientation="vertical" mx={-10} />
        <AppBreadcrumbs />
      </Group>
      <Image
        src="https://www.localized.world/_next/image?url=https%3A%2F%2Fcdn.localized.world%2Forganizations%2F6%2F3207769b-3b1c-4344-b5fd-048ce05c454a.png&w=2440&q=75"
        h={40}
        w={40}
        mt={4}
      />
    </Group>
  );
}

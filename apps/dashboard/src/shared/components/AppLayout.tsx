import { ReactNode } from 'react';
import { Container, Group, Image, Title } from '@mantine/core';
import classes from './AppLayout.module.css';
import { User } from '@/features/user/components/User.tsx';
import { AppTabs } from '@/shared/components/AppTabs.tsx';

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <>
      <div className={classes.header}>
        <Container size="xl">
          <Group justify="space-between" pt="lg" pb="sm">
            <Group gap="xs">
              <Image src="/logo.png" h={45} w={45} />

              <Title order={3} fw={600}>
                GJUPlans Admin
              </Title>
            </Group>

            <User />
          </Group>

          <Container size="lg">
            <AppTabs />
          </Container>
        </Container>
      </div>

      <div className={classes.content}>
        <Container size="xl">{children}</Container>
      </div>
    </>
  );
}

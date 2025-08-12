import { ReactNode } from 'react';
import { Container, Group, Image, Title } from '@mantine/core';
import classes from '../styles/AppLayout.module.css';
import { Me } from '@/features/user/components/Me.tsx';
import { AppTabs } from '@/shared/components/AppTabs.tsx';

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <>
      <div className={classes.header}>
        <Container size="xl">
          <Group justify="space-between" pt="md" pb={8}>
            <Group gap="xs">
              <Image src="/logo.png" h={45} w={45} />

              <Title order={3} fw={600}>
                GJUPlans Admin
              </Title>
            </Group>

            <Me />
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

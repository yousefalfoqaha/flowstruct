import { Stack } from '@mantine/core';
import { ReactNode } from 'react';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

export function PageLayout({ header, children }: Props) {
  return (
    <Stack>
      {header}
      {children}
    </Stack>
  );
}

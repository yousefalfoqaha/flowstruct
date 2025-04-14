import {Card, Group, Text} from '@mantine/core';
import {ReactNode} from 'react';

type AppCardProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
    footer?: ReactNode;
    headerAction?: ReactNode;
};

export function AppCard({title, subtitle, children, footer, headerAction}: AppCardProps) {
    return (
        <Card padding="lg" pt="md" withBorder shadow="sm">
            <Group justify="space-between">
                <div>
                    <Text size="xl" fw={600}>{title}</Text>
                    {subtitle && <Text size="xs" c="dimmed">{subtitle}</Text>}
                </div>
                {headerAction}
            </Group>

            <Card.Section py="lg" inheritPadding>
                {children}
                {footer && <Group justify="space-between" mt="xl">{footer}</Group>}
            </Card.Section>
        </Card>
    );
}


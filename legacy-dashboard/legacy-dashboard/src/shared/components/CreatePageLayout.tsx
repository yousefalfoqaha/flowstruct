import {ReactNode} from 'react';
import {Link} from '@tanstack/react-router';
import {Stack, Group, Title, ActionIcon} from '@mantine/core';
import {ArrowLeft} from 'lucide-react';
import {getDefaultSearchValues} from '@/lib/getDefaultSearchValues.ts';

type CreatePageLayoutProps = {
    title: string;
    backLink: string;
    children: ReactNode;
};

export function CreatePageLayout({title, backLink, children}: CreatePageLayoutProps) {
    return (
        <Stack>
            <Group>
                <Link search={getDefaultSearchValues()} to={backLink}>
                    <ActionIcon size={42} variant="default">
                        <ArrowLeft size={18}/>
                    </ActionIcon>
                </Link>

                <Title order={2} fw={600}>
                    {title}
                </Title>
            </Group>

            {children}
        </Stack>
    );
}

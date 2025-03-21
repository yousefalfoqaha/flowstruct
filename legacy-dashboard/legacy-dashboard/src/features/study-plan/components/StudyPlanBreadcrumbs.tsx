import { Breadcrumbs, Anchor } from '@mantine/core';
import {ChevronRight} from "lucide-react";

const items = [
    { title: 'All Programs', href: '#' },
    { title: 'B.Sc. Electrical Engineering', href: '#' },
    { title: '2023/2024 5G Track', href: '#' },
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

export function StudyPlanBreadcrumbs() {
    return (
        <>
            <Breadcrumbs separator={<ChevronRight size={14} />} separatorMargin="md" mt="xs">
                {items}
            </Breadcrumbs>
        </>
    );
}
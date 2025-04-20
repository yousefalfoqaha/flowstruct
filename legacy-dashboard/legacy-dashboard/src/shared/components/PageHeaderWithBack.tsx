import {ActionIcon, Group, Title} from "@mantine/core";
import {Link, LinkProps} from "@tanstack/react-router";
import {ArrowLeft} from "lucide-react";

type Props = {
    title: string;
    linkProps: LinkProps;
};

export function PageHeaderWithBack({title, linkProps}: Props) {
    return (
        <Group>
            <Link {...linkProps}>
                <ActionIcon size={42} variant="default">
                    <ArrowLeft size={18}/>
                </ActionIcon>
            </Link>
            <Title order={2} fw={600}>
                {title}
            </Title>
        </Group>
    );
}
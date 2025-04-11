import {ActionIcon, Breadcrumbs, Button} from '@mantine/core';
import {ChevronRight, Home} from "lucide-react";
import {Link} from "@tanstack/react-router";

export function ProgramsBreadcrumbs() {
    return (
        <>
            <Breadcrumbs separator={<ChevronRight size={14}/>} separatorMargin={5}>
                <Link to="/">
                    <ActionIcon mr="xs" size="compact-md" color="gray" variant="transparent">
                        <Home size={18} />
                    </ActionIcon>
                </Link>
                <Link to="/">
                    <Button size="compact-md" variant="transparent">
                        All Programs
                    </Button>
                </Link>
            </Breadcrumbs>
        </>
    );
}
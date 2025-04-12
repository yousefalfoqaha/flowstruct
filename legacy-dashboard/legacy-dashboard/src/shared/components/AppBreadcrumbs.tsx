import { ChevronRight, Home } from "lucide-react";
import { Link, useMatches } from "@tanstack/react-router";
import { ActionIcon, Breadcrumbs, Button } from "@mantine/core";

export function AppBreadcrumbs() {
    const matches = useMatches();

    const breadcrumbs = matches
        .filter((match) => match.loaderData?.crumb)
        .map(({ pathname, loaderData }) => ({
            route: pathname,
            label: loaderData?.crumb,
        }));

    return (
        <Breadcrumbs separator={<ChevronRight size={14} />} separatorMargin={5}>
            <Link to="/">
                <ActionIcon mr="xs" size="compact-md" color="gray" variant="transparent">
                    <Home size={18} />
                </ActionIcon>
            </Link>
            {breadcrumbs.map((crumb, i) => (
                <Link key={i} to={crumb.route || "/"}>
                    <Button size="compact-sm" variant="transparent">
                        {crumb.label}
                    </Button>
                </Link>
            ))}
        </Breadcrumbs>
    );
}

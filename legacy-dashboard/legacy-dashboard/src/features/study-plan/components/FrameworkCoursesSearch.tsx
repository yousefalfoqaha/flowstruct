import {Search, X} from "lucide-react";
import {ActionIcon, Input} from "@mantine/core";
import React from "react";
import {Table} from "@tanstack/react-table";
import {FrameworkCourse} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";

type FrameworkCoursesSearchProps = {
    table: Table<FrameworkCourse>;
}

export function FrameworkCoursesSearch({table}: FrameworkCoursesSearchProps) {
    const [search, setSearch] = React.useState<string>("");
    React.useEffect(() => table.setGlobalFilter(search), [search, table]);

    return (
        <Input
            w={450}
            leftSection={<Search size={18}/>}
            placeholder="Search"
            value={search}
            rightSectionPointerEvents="all"
            rightSection={
                search !== "" && (
                    <ActionIcon
                        radius="xl"
                        variant="white"
                        color="gray"
                        onClick={() => setSearch("")}
                    >
                        <X size={18}/>
                    </ActionIcon>
                )
            }
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

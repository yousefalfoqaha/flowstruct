import {Search, X} from "lucide-react";
import {ActionIcon, Input} from "@mantine/core";
import React from "react";
import {Table} from "@tanstack/react-table";

type TableSearchProps<TData> = {
    table: Table<TData>;
    width?: number | string;
    placeholder?: string;
};

export function DataTableSearch<TData>({
                                       table,
                                       width = 450,
                                       placeholder = "Search..."
                                   }: TableSearchProps<TData>) {
    const [search, setSearch] = React.useState<string>("");

    React.useEffect(() => {
        table.setGlobalFilter(search);
    }, [search, table]);

    const handleClear = () => setSearch("");

    return (
        <Input
            w={width}
            leftSection={<Search size={18}/>}
            placeholder={placeholder}
            value={search}
            rightSectionPointerEvents="all"
            rightSection={
                search !== "" && (
                    <ActionIcon
                        radius="xl"
                        variant="white"
                        color="gray"
                        onClick={handleClear}
                    >
                        <X size={18}/>
                    </ActionIcon>
                )
            }
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}
import {Search, X} from "lucide-react";
import {ActionIcon, Input} from "@mantine/core";
import {Table} from "@tanstack/react-table";
import {useNavigate} from "@tanstack/react-router";

type TableSearchProps<TData> = {
    table: Table<TData>;
    width?: number | string;
    placeholder?: string;
};

export function DataTableSearch<TData>({table, width = 450, placeholder = "Search..."}: TableSearchProps<TData>) {
    const navigate = useNavigate();

    const resetSearch = () => navigate({
        to: ".",
        search: (prev) => ({...prev, filter: ''})
    });

    const currentValue = table.getState().globalFilter as string;

    return (
        <Input
            w={width}
            leftSection={<Search size={18}/>}
            placeholder={placeholder}
            value={currentValue}
            rightSectionPointerEvents="all"
            rightSection={
                currentValue !== "" && (
                    <ActionIcon
                        radius="xl"
                        variant="white"
                        color="gray"
                        onClick={resetSearch}
                    >
                        <X size={18}/>
                    </ActionIcon>
                )
            }
            onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
    );
}

import {Divider, Group, Pagination, Select, Text} from "@mantine/core";
import {ListEnd} from "lucide-react";
import {Table} from "@tanstack/react-table";
import {FrameworkCourse} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";

type FrameworkCoursesTablePaginationProps = {
    table: Table<FrameworkCourse>;
}

export function FrameworkCoursesTablePagination({table}: FrameworkCoursesTablePaginationProps) {
    const {pageSize, pageIndex} = table.getState().pagination;
    const paginationMessage = `Showing ${pageSize * (pageIndex) + 1} – ${Math.min(table.getFilteredRowModel().rows.length, pageSize * (pageIndex + 1))} of ${table.getFilteredRowModel().rows.length}`;
    const PAGE_SIZES = ["5", "7", "10", "20", "50"];

    return (
        <Group>
            <Group gap="sm">
                <Group gap="xs">
                    <ListEnd size={18}/>
                    <Text size="sm">
                        Page Size
                    </Text>
                </Group>
                <Select
                    data={PAGE_SIZES}
                    value={pageSize.toString()}
                    onChange={(value) => table.setPagination({
                        pageIndex: 0,
                        pageSize: parseInt(value || "7")
                    })}
                    w={70}
                />
            </Group>

            <Divider orientation="vertical"/>

            <Text size="sm">{paginationMessage}</Text>
            <Pagination total={table.getPageCount()}
                        onChange={(page) => table.setPagination({
                            pageIndex: page - 1,
                            pageSize: pageSize
                        })}
                        value={pageIndex + 1}
                        withPages={false}
            />
        </Group>
    );
}
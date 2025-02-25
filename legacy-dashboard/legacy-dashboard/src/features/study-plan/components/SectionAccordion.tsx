import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {DataTable} from "@/shared/components/DataTable.tsx";

import {CircleMinus, EllipsisVertical} from "lucide-react";
import {useMemo} from "react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {Section} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";
import {Accordion, AccordionControlProps, ActionIcon, Center, Text, MultiSelect, Group, Flex} from "@mantine/core";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";

type SectionTableProps = {
    section: Section;
    index: number;
};

function AccordionControl({section, ...props}: AccordionControlProps & { section: Section }) {
    return (
        <Center>
            <Accordion.Control {...props} />
            <Flex gap="sm" align="center">
                <CourseSearch section={section} />

                <ActionIcon size="lg" variant="subtle" color="gray">
                    <EllipsisVertical size={16}/>
                </ActionIcon>
            </Flex>
        </Center>
    );
}

export function SectionAccordion({section, index}: SectionTableProps) {
    const courses = useCourseList();

    const {accessor, display} = createColumnHelper<Course>();

    const columns = useMemo(() => {
        return [
            accessor("code", {
                header: "Code"
            }),
            accessor("name", {
                header: "Name"
            }),
            accessor("creditHours", {
                header: () => <h1 className="text-nowrap">Credit Hours</h1>
            }),
            accessor("type", {
                header: "Type"
            }),
            display({
                id: 'actions',
                header: () => <div className="flex justify-end pr-7">Actions</div>,
                cell: () => (
                    <div className="flex gap-2 justify-end">
                        <ActionIcon size="lg" variant="subtle">
                            <CircleMinus size={16}/>
                        </ActionIcon>
                    </div>
                )
            })
        ];
    }, [accessor, display]);

    const rowData = [...section.courses].map(courseId => courses[courseId]);

    const table = useReactTable({
        columns,
        data: rowData ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Accordion.Item value={`section-${index}`}>
            <AccordionControl section={section} mr="sm">
                <Text size="lg">
                    Section {index} - {section.level} {section.type} {section.name ? `- ${section.name}` : ""}
                </Text>
                <Text c="dimmed">
                    {section.requiredCreditHours} Credit Hours Required
                </Text>
            </AccordionControl>
            <Accordion.Panel>
                <DataTable table={table}/>
            </Accordion.Panel>
        </Accordion.Item>
    );
}

import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {DataTable} from "@/shared/components/DataTable.tsx";

import {CircleMinus, EllipsisVertical, Pencil, Trash} from "lucide-react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {Section} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";
import {Accordion, AccordionControlProps, ActionIcon, Center, Text, Flex, Loader, Group, Badge} from "@mantine/core";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useRemoveCourseFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import React from "react";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";

type SectionTableProps = {
    section: Section;
    index: number;
};

function AccordionControl({section, ...props}: AccordionControlProps & { section: Section }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const deleteSection = useDeleteSection();

    return (
        <Center>
            <Accordion.Control {...props} />
            <Flex pr={15} gap="sm">
                <CourseSearch section={section}/>

                <ActionIcon
                    variant="light"
                    size="md"
                    onClick={() =>
                        modals.open({
                            title: `Edit ${section.level} ${section.type} ${section.name ? `- ${section.name}` : ''} Details`,
                            children: <EditSectionDetailsModal studyPlanId={studyPlanId} section={section}/>,
                            centered: true
                        })
                    }
                >
                    <Pencil size={18}/>
                </ActionIcon>

                <ActionIcon
                    variant="light"
                    size="md"
                    onClick={() =>
                        modals.openConfirmModal({
                            title: 'Please confirm your action',
                            children: (
                                <Text size="sm">
                                    Deleting this section will remove all of its courses from the program map as well,
                                    are you absolutely
                                    sure?
                                </Text>
                            ),
                            labels: {confirm: 'Confirm', cancel: 'Cancel'},
                            onConfirm: () => deleteSection.mutate({
                                studyPlanId: studyPlanId,
                                sectionId: section.id
                            })
                        })
                    }
                >
                    <Trash size={18}/>
                </ActionIcon>
            </Flex>
        </Center>
    );
}

export function SectionAccordion({section, index}: SectionTableProps) {
    const courses = useCourseList();
    const removeCourseFromSection = useRemoveCourseFromSection();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    const {accessor, display} = createColumnHelper<Course>();

    const columns = [
        accessor("code", {
            header: "Code",
            cell: ({row}) => <Badge variant="light">{row.original.code}</Badge>
        }),
        accessor("name", {
            header: "Name"
        }),
        accessor("creditHours", {
            header: "Credits"
        }),
        accessor("ects", {
            header: "ECTS"
        }),
        accessor("lectureHours", {
            header: "Lecture Hrs"
        }),
        accessor("practicalHours", {
            header: "Practical Hrs"
        }),
        accessor("type", {
            header: "Type"
        }),
        display({
            id: 'actions',
            cell: ({row}) => {
                const showLoader = removeCourseFromSection.isPending &&
                    removeCourseFromSection.variables.courseId === row.original.id;

                return (
                    <Group justify="flex-end">
                        <ActionIcon
                            size="lg"
                            variant="subtle"
                            onClick={() => removeCourseFromSection.mutate({
                                studyPlanId: studyPlanId,
                                sectionId: section.id,
                                courseId: row.original.id
                            })}
                            disabled={showLoader}
                            children={showLoader ? <Loader size={16}/> : <CircleMinus size={16}/>}
                        />
                    </Group>
                );
            }
        })
    ];

    const rowData = React.useMemo(() => {
        if (!courses) return [];
        return [...section.courses].map(courseId => courses[courseId]).filter(Boolean);
    }, [courses, section.courses]);

    const table = useReactTable({
        columns,
        data: rowData ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Accordion.Item value={`section-${section.id}`}>
            <AccordionControl section={section} mr="sm">
                <Text size="lg">
                    Section {index} - {section.level} {section.type} {section.name ? `- ${section.name}` : ""}
                </Text>
                <Text c="dimmed">
                    {section.requiredCreditHours} Cr. Hrs Required
                </Text>
            </AccordionControl>
            <Accordion.Panel>
                <DataTable table={table}/>
            </Accordion.Panel>
        </Accordion.Item>
    );
}

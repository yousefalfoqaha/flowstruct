import {
    createColumnHelper,
    ExpandedState,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {DataTable} from "@/shared/components/DataTable.tsx";

import {ChevronDown, ChevronUp, CircleMinus, CornerDownRight, Pencil, Trash} from "lucide-react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {Section} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";
import {
    Accordion,
    AccordionControlProps,
    ActionIcon,
    Center,
    Text,
    Flex,
    Loader,
    Group,
    Badge, Button, Indicator
} from "@mantine/core";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useRemoveCourseFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import React from "react";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";
import {useFlaggedCourses} from "@/contexts/FlaggedCoursesContext.tsx";

type SectionTableProps = {
    section: Section;
    index: number;
};

function AccordionControl({section, ...props}: AccordionControlProps & { section: Section }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const deleteSection = useDeleteSection();

    const isDeleting = deleteSection.isPending && deleteSection.variables.sectionId === section.id;

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
                    disabled={isDeleting}
                    children={isDeleting ? <Loader size={18}/> : <Trash size={18}/>}
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
                </ActionIcon>
            </Flex>
        </Center>
    );
}

export function SectionAccordion({section, index}: SectionTableProps) {
    const removeCourseFromSection = useRemoveCourseFromSection();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const {data: courses} = useCourseList(studyPlanId);

    const {accessor, display} = createColumnHelper<Course>();
    const [expanded, setExpanded] = React.useState<ExpandedState>({});

    const toggleRowExpansion = (courseId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [courseId]: !prev[courseId],
        }));
    };

    const {flaggedCourses} = useFlaggedCourses();

    const columns = [
        accessor("code", {
            header: "Code",
            cell: ({row}) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        paddingLeft: `${row.depth * 2 - 1}rem`,
                    }}
                >
                    {row.depth > 0 ?
                        <CornerDownRight style={{color: "gray", marginBottom: "0.1rem"}} size={16}/> : null}
                    <Badge variant="light">{row.original.code}</Badge>
                </div>
            )
        }),
        accessor("name", {
            header: "Name"
        }),
        accessor("creditHours", {
            header: "Credits",
            size: 50,
            minSize: 50,
            maxSize: 70,
        }),
        accessor("type", {
            header: "Type",
            size: 50,
            minSize: 50,
            maxSize: 70,
        }),

        display({
            id: 'actions',
            header: () => <Text fw="bold" size="sm" ta="center">Actions</Text>,
            cell: ({row}) => {
                const isRemovingCourse = removeCourseFromSection.isPending &&
                    removeCourseFromSection.variables.courseId === row.original.id;

                return (
                    <Group justify="flex-end">
                        {row.original.prerequisites.length > 0 && (
                            <Indicator
                                disabled={!flaggedCourses.has(row.original.id)}
                                inline
                                label="Missing"
                                color="red"
                                size={16}
                            >
                                <Button
                                    variant="subtle"
                                    leftSection={row.getIsExpanded() ? <ChevronUp size={14}/> :
                                        <ChevronDown size={14}/>}
                                    onClick={() => toggleRowExpansion(row.id)}
                                >
                                    Prerequisites
                                </Button>
                            </Indicator>
                        )}

                        <ActionIcon
                            size="lg"
                            variant="subtle"
                            onClick={() => removeCourseFromSection.mutate({
                                studyPlanId: studyPlanId,
                                courseId: row.original.id
                            })}
                            disabled={isRemovingCourse}
                            children={isRemovingCourse ? <Loader size={16}/> : <CircleMinus size={16}/>}
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
        getExpandedRowModel: getExpandedRowModel(),
        getSubRows: (course) => {
            if (!courses || !course.prerequisites) return [];
            return course.prerequisites.map(prerequisite => courses[prerequisite.prerequisite]).filter(Boolean);
        },
        state: {
            expanded: expanded,
        },
        onExpandedChange: setExpanded,
        getRowCanExpand: (row) => row.original.prerequisites.length > 0
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
                <DataTable
                    table={table}
                    rowProps={(row) => ({
                        style: {
                            backgroundColor: row.getIsExpanded() ? "#f8f9fa" : "transparent",
                            transition: "background-color 0.2s ease",
                        },
                    })}
                />
            </Accordion.Panel>
        </Accordion.Item>
    );
}

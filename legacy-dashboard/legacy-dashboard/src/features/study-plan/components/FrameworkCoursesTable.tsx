import {useRemoveCourseFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";
import {CircleMinus, Plus} from "lucide-react";
import {ActionIcon, Badge, Button, Flex, Group, Loader, Pagination, Pill, Text} from "@mantine/core";
import React from "react";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {CoursePrerequisite} from "@/features/study-plan/types.ts";

const columnHelper = createColumnHelper<Course & { sectionCourse: { prerequisites: CoursePrerequisite[] } }>();

export function FrameworkCoursesTable() {
    const removeCourseFromSection = useRemoveCourseFromSection();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: courses} = useCourseList(studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const rowData = React.useMemo(() => {
        if (!studyPlan || !courses) return [];

        const rows: (Course & { sectionCourse: { prerequisites: CoursePrerequisite[] } })[] = [];

        studyPlan.sections.forEach((section) => {
            Object.entries(section.courses).forEach(([courseId, sectionCourse]) => {
                const course = courses[Number(courseId)];
                if (!course) return;

                rows.push({...course, sectionCourse});
            });
        });

        return rows;
    }, [studyPlan, courses]);

    const columns = [
        columnHelper.accessor("code", {
            header: "Code",
            cell: ({row}) => (
                <Badge variant="light">{row.original.code}</Badge>
            ),
        }),
        columnHelper.accessor("name", {
            header: "Name",
        }),
        columnHelper.accessor("creditHours", {
            header: "Credits",
        }),
        columnHelper.display({
            id: "prerequisites",
            header: "Prerequisites",
            cell: ({row}) => {
                const prerequisites = row.original.sectionCourse.prerequisites || [];

                return (
                    <Pill.Group>
                        {prerequisites.map((prerequisite) => {
                            const prereqCourse = courses[prerequisite.prerequisite];
                            if (!prereqCourse) return null;
                            return (
                                <Pill key={prereqCourse.id} withRemoveButton>
                                    {prereqCourse.code} {prereqCourse.name}
                                </Pill>
                            );
                        })}
                        <Button variant="subtle" size="xs" leftSection={<Plus size={14}/>}>
                            Add
                        </Button>
                    </Pill.Group>
                );
            },
        }),
        columnHelper.display({
            id: "section",
            header: "Section",
            cell: ({row}) => {
                const section = studyPlan.sections.find(section =>
                    section.courses[row.original.id]
                );

                return <Badge variant="outline" style={{textWrap: "wrap"}}>2.1.4</Badge>
            }
        }),
        columnHelper.display({
            id: "actions",
            cell: ({row}) => {
                const isRemovingCourse =
                    removeCourseFromSection.isPending &&
                    removeCourseFromSection.variables.courseId === row.original.id;

                return (
                    <Group justify="flex-end">
                        <ActionIcon
                            size="lg"
                            variant="subtle"
                            onClick={() =>
                                removeCourseFromSection.mutate({
                                    studyPlanId: studyPlanId,
                                    courseId: row.original.id,
                                })
                            }
                            disabled={isRemovingCourse}
                        >
                            {isRemovingCourse ? <Loader size={16}/> : <CircleMinus size={16}/>}
                        </ActionIcon>
                    </Group>
                );
            },
        }),
    ];

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        columns,
        data: rowData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return (
        <Flex direction="column" align="center" gap="md">
            <DataTable table={table}/>

            <Pagination total={table.getPageCount()}
                        onChange={(page) => setPagination({pageIndex: page, pageSize: 10})}/>
        </Flex>
    );
}

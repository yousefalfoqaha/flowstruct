import {useRemoveCourseFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";
import {CircleMinus} from "lucide-react";
import {
    ActionIcon,
    Badge,
    Flex,
    Group, Indicator,
    Loader,
    Pagination,
    Pill,
    Text
} from "@mantine/core";
import React from "react";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {CoursePrerequisite} from "@/features/study-plan/types.ts";
import {PrerequisiteMultiSelect} from "@/features/study-plan/components/PrerequisiteMultiSelect.tsx";
import {useRemoveCoursePrerequisite} from "@/features/study-plan/hooks/useRemoveCoursePrerequisite.ts";
import {useRemoveCourseCorequisite} from "@/features/study-plan/hooks/useRemoveCourseCorequisite.ts";

const columnHelper = createColumnHelper<Course & { prerequisites: CoursePrerequisite[], corequisites: number[] }>();

export function FrameworkCoursesTable() {
    const removeCourseFromSection = useRemoveCourseFromSection();
    const removePrerequisite = useRemoveCoursePrerequisite();
    const removeCorequisite = useRemoveCourseCorequisite();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: courses} = useCourseList(studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const rowData = React.useMemo(() => {
        if (!studyPlan || !courses) return [];

        const rows: (Course & { prerequisites: CoursePrerequisite[], corequisites: number[] })[] = [];

        studyPlan.sections.forEach((section) => {
            section.courses.forEach(courseId => {
                const course = courses[Number(courseId)];
                if (!course) return;

                const prerequisites = studyPlan.coursePrerequisites[courseId];
                const corequisites = studyPlan.courseCorequisites[courseId];

                rows.push({...course, prerequisites, corequisites});
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
            header: "Prerequisites / Corequisites",
            cell: ({row}) => {
                const prerequisites = row.original.prerequisites || [];
                const corequisites = row.original.corequisites || [];

                return (
                    <Flex align="center" wrap="wrap" gap={7} w={300}>
                        {prerequisites.map((prerequisite) => {
                            const prereqCourse = courses[prerequisite.prerequisite];
                            if (!prereqCourse) return null;

                            const isRemovingPrerequisite =
                                removePrerequisite.isPending &&
                                removePrerequisite.variables.prerequisiteId === prereqCourse.id &&
                                removePrerequisite.variables.courseId === row.original.id;


                            return (
                                <Pill
                                    key={prereqCourse.id}
                                    withRemoveButton
                                    disabled={isRemovingPrerequisite}
                                    onRemove={() => removePrerequisite.mutate({
                                        studyPlanId: studyPlanId,
                                        courseId: row.original.id,
                                        prerequisiteId: prerequisite.prerequisite
                                    })}
                                >
                                    {prereqCourse.code}
                                </Pill>
                            );
                        })}

                        {corequisites.map(corequisite => {
                            const coreqCourse = courses[corequisite];
                            if (!coreqCourse) return null;

                            const isRemovingCorequisite =
                                removeCorequisite.isPending &&
                                removeCorequisite.variables.corequisiteId === coreqCourse.id &&
                                removeCorequisite.variables.courseId === row.original.id;

                            return (
                                <Indicator
                                    key={coreqCourse.id}
                                    size={14}
                                    color="gray"
                                    position="middle-start"
                                    offset={18}
                                    fw="bold"
                                    inline
                                    label="CO"
                                >
                                    <Pill
                                        fw="normal"
                                        pl={35}
                                        disabled={isRemovingCorequisite}
                                        key={coreqCourse.id}
                                        withRemoveButton
                                        onRemove={() => removeCorequisite.mutate({
                                            studyPlanId: studyPlanId,
                                            courseId: row.original.id,
                                            corequisiteId: corequisite
                                        })}
                                    >
                                        {coreqCourse.code}
                                    </Pill>
                                </Indicator>
                            )
                        })}

                        <PrerequisiteMultiSelect parentCourse={row.original.id}/>
                        {
                            removePrerequisite.isPending && removePrerequisite.variables.courseId === row.original.id ||
                            removeCorequisite.isPending && removeCorequisite.variables.courseId === row.original.id
                                ? <Loader size={14}/>
                                : null
                        }
                    </Flex>
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
                            loading={isRemovingCourse}
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
                            <CircleMinus size={16}/>
                        </ActionIcon>
                    </Group>
                );
            },
        }),
    ];

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 8,
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
        autoResetPageIndex: false,
    });

    const paginationMessage = `Showing ${pagination.pageSize * (pagination.pageIndex) + 1} – ${Math.min(rowData.length, pagination.pageSize * (pagination.pageIndex + 1))} of ${rowData.length}`;

    return (
        <Flex direction="column" align="center" gap="md">
            <DataTable table={table}/>

            <Group justify="flex-end">
                <Text size="sm">{paginationMessage}</Text>
                <Pagination total={table.getPageCount()}
                            onChange={(page) => setPagination({pageIndex: page - 1, pageSize: pagination.pageSize})}
                            value={pagination.pageIndex + 1}
                            withPages={false}
                />
            </Group>
        </Flex>
    );
}

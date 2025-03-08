import {useRemoveCourseFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";
import {CircleMinus, CornerDownRight, Plus} from "lucide-react";
import {ActionIcon, Badge, Button, Group, Loader, Pill} from "@mantine/core";
import React from "react";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Section} from "@/features/study-plan/types.ts";

export function SectionCoursesTable({section}: { section: Section }) {
    const removeCourseFromSection = useRemoveCourseFromSection();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const {data: courses} = useCourseList(studyPlanId);
    const {accessor, display} = createColumnHelper<Course>();

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
        display({
            id: 'prerequisites',
            header: 'Prerequisites',
            cell: ({row}) => {
                const prerequisites = section.courses[row.original.id]?.prerequisites || [];

                return (
                    <Pill.Group>
                        {prerequisites.map((prerequisite) => {
                            const course = courses[prerequisite.prerequisite];
                            return (
                                <Pill key={course.id} withRemoveButton>
                                    {course.code} {course.name}
                                </Pill>
                            );
                        })}
                        <Button variant="subtle" size="compact-xs" leftSection={<Plus size={14}/>}>
                            Add
                        </Button>
                    </Pill.Group>
                );
            }

        }),
        display({
            id: 'actions',
            cell: ({row}) => {
                const isRemovingCourse = removeCourseFromSection.isPending &&
                    removeCourseFromSection.variables.courseId === row.original.id;

                return (
                    <Group justify="flex-end">
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
        return Object.keys(section.courses)
            .map(courseId => courses[Number(courseId)])
            .filter(Boolean);
    }, [courses, section.courses]);

    const table = useReactTable({
        columns,
        data: rowData ?? [],
        getCoreRowModel: getCoreRowModel()
    });

    return <DataTable table={table}/>
}
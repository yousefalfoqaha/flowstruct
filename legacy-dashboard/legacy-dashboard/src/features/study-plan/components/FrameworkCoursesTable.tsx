import {useRemoveCoursesFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {
    createColumnHelper,
    getCoreRowModel,
    getPaginationRowModel, getSortedRowModel, RowSelectionState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";
import {ChevronsUpDown, Trash} from "lucide-react";
import {
    ActionIcon,
    Badge, Button, Checkbox,
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
import {CourseRelation} from "@/features/study-plan/types.ts";
import {PrerequisiteMultiSelect} from "@/features/study-plan/components/PrerequisiteMultiSelect.tsx";
import {useRemoveCoursePrerequisite} from "@/features/study-plan/hooks/useRemoveCoursePrerequisite.ts";
import {useRemoveCourseCorequisite} from "@/features/study-plan/hooks/useRemoveCourseCorequisite.ts";
import {SectionsCombobox} from "@/features/study-plan/components/SectionsCombobox.tsx";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {SectionsList} from "@/features/study-plan/components/SectionsList.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {openConfirmModal} from "@mantine/modals";

type FrameworkCourse = Course & {
    prerequisites: Record<number, CourseRelation>,
    corequisites: number[],
    section: number,
    sectionCode: string
}

const columnHelper = createColumnHelper<FrameworkCourse>();

export function FrameworkCoursesTable() {
    const removeCoursesFromSection = useRemoveCoursesFromSection();
    const removePrerequisite = useRemoveCoursePrerequisite();
    const removeCorequisite = useRemoveCourseCorequisite();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: courses} = useCourseList(studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const [sorting, setSorting] = React.useState<SortingState>([{id: 'code', desc: false}]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [pagination, setPagination] = React.useState({pageIndex: 0, pageSize: 8,});

    const columns = [
        columnHelper.display({
            id: 'selection',
            header: () => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        }),
        columnHelper.accessor("code", {
            header: ({column}) => (
                <Group>
                    <ActionIcon variant="transparent" onClick={() => column.toggleSorting()} size="xs">
                        <ChevronsUpDown size={14}/>
                    </ActionIcon>
                    Code
                </Group>
            ),
            sortingFn: 'alphanumeric',
            cell: ({row}) => (
                <Badge variant="light">{row.original.code}</Badge>
            ),
        }),
        columnHelper.accessor("name", {
            header: ({column}) => (
                <Group>
                    <ActionIcon variant="transparent" onClick={() => column.toggleSorting()} size="xs">
                        <ChevronsUpDown size={14}/>
                    </ActionIcon>
                    Name
                </Group>
            ),
            sortingFn: 'alphanumeric'
        }),
        columnHelper.accessor("creditHours", {
            header: 'Credits',
            sortingFn: 'alphanumeric',
        }),
        columnHelper.display({
            id: "prerequisites",
            header: "Prerequisites / Corequisites",
            cell: ({row}) => {
                const prerequisites = row.original.prerequisites || [];
                const corequisites = row.original.corequisites || [];

                return (
                    <Flex align="center" wrap="wrap" gap={7} w={300}>
                        {Object.keys(prerequisites).map((prerequisite) => {
                            const prereqCourse = courses[parseInt(prerequisite)];
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
                                        prerequisiteId: prereqCourse.id
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
                return (
                    <SectionsCombobox
                        courseId={row.original.id}
                        sectionId={row.original.section}
                        courseSectionCode={row.original.sectionCode}
                    />
                );
            }
        }),
    ];

    const frameworkCourses = React.useMemo(() => {
        if (!studyPlan || !courses) return [];

        const rows: FrameworkCourse[] = [];

        studyPlan.sections.forEach((section) => {
            const sectionCode = getSectionCode(section);

            section.courses.forEach(courseId => {
                const course = courses[Number(courseId)];
                if (!course) return;

                const prerequisites = studyPlan.coursePrerequisites[courseId];
                const corequisites = studyPlan.courseCorequisites[courseId];

                rows.push({...course, prerequisites, corequisites, section: section.id, sectionCode: sectionCode});
            });
        });

        return rows;
    }, [studyPlan, courses]);

    const table = useReactTable({
        columns,
        data: frameworkCourses,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            pagination,
            sorting,
            rowSelection
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
    });

    const paginationMessage = `Showing ${pagination.pageSize * (pagination.pageIndex) + 1} – ${Math.min(frameworkCourses.length, pagination.pageSize * (pagination.pageIndex + 1))} of ${frameworkCourses.length}`;
    const selectedRows = table.getSelectedRowModel().rows;

    return (
        <Flex direction="column" align="center" gap="md">
            <Group justify="space-between" align="center">
                <SectionsList sections={studyPlan.sections}/>

                {selectedRows.length &&
                    <Button
                        onClick={() => openConfirmModal({
                            title: 'Please confirm your action',
                            children: (
                                <Text size="sm">
                                    Deleting these courses will remove them from the program map and any prerequisite
                                    relationships. Are you sure you want to proceed?
                                </Text>
                            ),
                            labels: {confirm: 'Remove Courses', cancel: 'Cancel'},
                            onConfirm: () => removeCoursesFromSection.mutate({
                                studyPlanId: studyPlanId,
                                courseIds: selectedRows.map(row => row.original.id),
                            }, {onSuccess: () => setRowSelection({})})
                        })}
                        color="red"
                        leftSection={<Trash size={18}/>}
                        loading={removeCoursesFromSection.isPending}
                    >
                        Remove ({selectedRows.length})
                    </Button>
                }

                <CourseSearch/>
            </Group>
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

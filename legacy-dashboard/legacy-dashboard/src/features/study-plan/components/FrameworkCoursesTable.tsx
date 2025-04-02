import {useRemoveCoursesFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {
    ColumnFiltersState,
    createColumnHelper,
    getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, RowSelectionState,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";
import {ArrowDownUp, Eye, Filter, Search, Trash, X} from "lucide-react";
import {
    ActionIcon,
    Badge, Button, Checkbox,
    Flex,
    Group, Indicator, Input,
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
import {openConfirmModal} from "@mantine/modals";
import {SectionsTree} from "@/features/study-plan/components/SectionsTree.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useDebouncedValue} from "@mantine/hooks";

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
    const [pagination, setPagination] = React.useState({pageIndex: 0, pageSize: 10,});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [search, setSearch] = React.useState<string>("");
    const [debouncedSearch] = useDebouncedValue(search, 400);

    React.useEffect(() => setGlobalFilter(debouncedSearch), [debouncedSearch]);

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
                <Group wrap="nowrap">
                    <ActionIcon variant="transparent" onClick={() => column.toggleSorting()} size="xs">
                        <ArrowDownUp size={14}/>
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
                <Group wrap="nowrap">
                    <ActionIcon variant="transparent" onClick={() => column.toggleSorting()} size="xs">
                        <ArrowDownUp size={14}/>
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
                    <Flex align="center" w={250} wrap="wrap" gap={7}>
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
                                        onRemove={() => removeCorequisite.mutate({
                                            studyPlanId: studyPlanId,
                                            courseId: row.original.id,
                                            corequisiteId: corequisite
                                        })}
                                        fw="normal"
                                        pl={35}
                                        disabled={isRemovingCorequisite}
                                        key={coreqCourse.id}
                                        withRemoveButton
                                    >
                                        {coreqCourse.code}
                                    </Pill>
                                </Indicator>
                            )
                        })}

                        <PrerequisiteMultiSelect parentCourseId={row.original.id}/>
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
            enableColumnFilter: true,
            cell: ({row}) => {
                return (
                    <SectionsCombobox
                        courseId={row.original.id}
                        sectionId={row.original.section}
                        courseSectionCode={row.original.sectionCode}
                    />
                );
            },
            filterFn: (row, _, filterValue: number) => {
                return row.original.section === filterValue
            },
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


    const selectSectionHandler = ((sectionId: number | null) => {
        if (sectionId === null) {
            setColumnFilters([]);
            return;
        }
        setColumnFilters([{id: 'section', value: sectionId}]);
    });


    const table = useReactTable({
        columns,
        data: frameworkCourses,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            pagination,
            sorting,
            rowSelection,
            globalFilter,
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        autoResetPageIndex: false,
    });

    const paginationMessage = `Showing ${pagination.pageSize * (pagination.pageIndex) + 1} – ${Math.min(table.getFilteredRowModel().rows.length, pagination.pageSize * (pagination.pageIndex + 1))} of ${table.getFilteredRowModel().rows.length}`;
    const selectedRows = table.getSelectedRowModel().rows;
    const sectionFilter = columnFilters.find(filter => filter.id === 'section');
    const selectedSectionId = sectionFilter?.value as number;
    const selectedSection = studyPlan.sections.find(s => s.id === selectedSectionId);
    let filteredSectionFooter: string = "All Courses";

    if (selectedSection) {
        filteredSectionFooter = `${getSectionCode(selectedSection)}: ${selectedSection.level} ${selectedSection.type} ${selectedSection.name
            ? `- ${selectedSection.name}`
            : (getSectionCode(selectedSection).split('.').length > 2 ? "- General" : "")}`;
    }


    return (
        <Flex gap="xl">
            <SectionsTree
                selectedSection={selectedSectionId}
                selectSection={selectSectionHandler}
            />

            <Flex direction="column" style={{flex: 1}} gap="sm">
                <Group justify="space-between">
                    <Input
                        w={450}
                        leftSection={<Search size={18}/>}
                        placeholder="Search"
                        value={search}
                        rightSectionPointerEvents="all"
                        rightSection={
                            search !== "" && (
                                <ActionIcon
                                    radius="xl"
                                    variant="white"
                                    color="gray"
                                    onClick={() => setSearch("")}
                                >
                                    <X size={18}/>
                                </ActionIcon>
                            )
                        }
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Group gap="sm">
                        {selectedRows.length &&
                            <Button
                                onClick={() => openConfirmModal({
                                    title: 'Please confirm your action',
                                    children: (
                                        <Text size="sm">
                                            Deleting these courses will remove them from the program map and any
                                            prerequisite
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

                        <CourseSearch focusedSection={selectedSectionId}/>
                    </Group>
                </Group>

                <DataTable table={table}/>

                <Group justify="space-between">
                    <Group gap="sm">
                        <Eye size={14} color="gray"/>
                        <Text c="dimmed" size="sm">{filteredSectionFooter}</Text>
                    </Group>

                    <Group>
                        <Text size="sm">{paginationMessage}</Text>
                        <Pagination total={table.getPageCount()}
                                    onChange={(page) => setPagination({
                                        pageIndex: page - 1,
                                        pageSize: pagination.pageSize
                                    })}
                                    value={pagination.pageIndex + 1}
                                    withPages={false}
                        />
                    </Group>
                </Group>
            </Flex>
        </Flex>
    );
}

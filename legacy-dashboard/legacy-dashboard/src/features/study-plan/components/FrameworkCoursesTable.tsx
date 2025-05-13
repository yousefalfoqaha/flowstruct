import {Flex, Group, Paper, Stack, Title} from "@mantine/core";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {SectionsTree} from "@/features/study-plan/components/SectionsTree.tsx";
import {StudyPlanCourseAdder} from "@/features/study-plan/components/StudyPlanCourseAdder.tsx";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {FilteredSectionIndicator} from "@/features/study-plan/components/FilteredSectionIndicator.tsx";
import React from "react";
import {getFrameworkCoursesTableColumns} from "@/features/study-plan/components/FrameworkCoursesTableColumns.tsx";
import {getSectionCode} from "@/utils/getSectionCode.ts";
import {FrameworkCourse} from "@/features/study-plan/types.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {ListPlus} from "lucide-react";
import {SelectedCoursesToolbar} from "@/features/study-plan/components/SelectedCoursesToolbar.tsx";

export function FrameworkCoursesTable() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();

    const data = React.useMemo(() => {
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

    const columns = React.useMemo(
        () => getFrameworkCoursesTableColumns(),
        []
    );

    const table = useDataTable<FrameworkCourse>({
        data,
        columns,
        getRowId: (originalRow) => String(originalRow.id),
        initialState: {
            sorting: [
                {
                    id: 'code',
                    desc: false
                }
            ]
        }
    });

    if (studyPlan.sections.length === 0) {
        return (
            <Paper withBorder shadow="sm">
                <Stack align="center" gap="xs" my={32}>
                    <ListPlus size={32}/>
                    <Title
                        mb="sm"
                        order={2}
                        fw={600}
                    >
                        Create New Section
                    </Title>
                    <CreateSectionModal studyPlanId={studyPlan.id}/>
                </Stack>
            </Paper>
        );
    }

    return (
        <>
            <SelectedCoursesToolbar
                table={table}
                studyPlan={studyPlan}
            />
            <Flex direction={{base: 'column', lg: 'row'}} gap="lg">
                <SectionsTree table={table} studyPlan={studyPlan}/>

                <Flex direction="column" style={{flex: 1}} gap="md">
                    <Group>
                        <DataTableSearch width="" placeholder="Search courses..." table={table}/>
                        <FilteredSectionIndicator table={table}/>
                    </Group>

                    <AppCard
                        title="Framework Courses"
                        subtitle="Manage all study plan courses"
                        headerAction={<StudyPlanCourseAdder studyPlan={studyPlan}/>}
                    >
                        <DataTable table={table}/>
                    </AppCard>

                    <DataTablePagination table={table}/>
                </Flex>
            </Flex>
        </>
    );
}

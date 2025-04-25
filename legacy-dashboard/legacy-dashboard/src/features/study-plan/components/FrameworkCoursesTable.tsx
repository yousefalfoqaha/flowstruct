import {Flex, Group} from "@mantine/core";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {SectionsTree} from "@/features/study-plan/components/SectionsTree.tsx";
import {StudyPlanCourseAdder} from "@/features/study-plan/components/StudyPlanCourseAdder.tsx";
import {useDataTable} from "@/shared/hooks/useDataTable.ts";
import {DataTablePagination} from "@/shared/components/DataTablePagination.tsx";
import {RemoveStudyPlanCoursesButton} from "@/features/study-plan/components/RemoveStudyPlanCoursesButton.tsx";
import {DataTableSearch} from "@/shared/components/DataTableSearch.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {FilteredSectionIndicator} from "@/features/study-plan/components/FilteredSectionIndicator.tsx";
import React from "react";
import {getFrameworkCoursesTableColumns} from "@/features/study-plan/components/FrameworkCoursesTableColumns.tsx";
import {getSectionCode} from "@/utils/getSectionCode.ts";
import {FrameworkCourse} from "@/features/study-plan/types.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";

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

    const table = useDataTable<FrameworkCourse>({data, columns});

    return (
        <Flex gap="lg">
            <SectionsTree table={table} studyPlan={studyPlan}/>

            <Flex direction="column" style={{flex: 1}} gap="md">
                <Group justify="space-between">
                    <DataTableSearch placeholder="Search courses..." table={table}/>
                    <RemoveStudyPlanCoursesButton studyPlan={studyPlan} table={table}/>
                </Group>

                <AppCard
                    title="Framework Courses"
                    subtitle="Manage all study plan courses"
                    headerAction={<StudyPlanCourseAdder studyPlan={studyPlan}/>}
                >
                    <DataTable table={table}/>
                </AppCard>

                <Group justify="space-between">
                    <FilteredSectionIndicator table={table}/>
                    <DataTablePagination table={table}/>
                </Group>
            </Flex>
        </Flex>
    );
}

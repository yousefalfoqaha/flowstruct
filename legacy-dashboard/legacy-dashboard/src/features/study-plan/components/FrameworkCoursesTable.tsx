import {Flex, Group} from "@mantine/core";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {SectionsTree} from "@/features/study-plan/components/SectionsTree.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useDataTable} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";
import {FrameworkCoursesTablePagination} from "@/features/study-plan/components/FrameworkCoursesTablePagination.tsx";
import {RemoveStudyPlanCoursesButton} from "@/features/study-plan/components/RemoveStudyPlanCoursesButton.tsx";
import {FrameworkCoursesSearch} from "@/features/study-plan/components/FrameworkCoursesSearch.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {FilteredSectionIndicator} from "@/features/study-plan/components/FilteredSectionIndicator.tsx";
import React from "react";
import {getFrameworkCoursesTableColumns} from "@/features/study-plan/components/FrameworkCoursesTableColumns.tsx";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {FrameworkCourse} from "@/features/study-plan/types.ts";

export function FrameworkCoursesTable() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useCourseList();

    const columns = React.useMemo(
        () =>
            getFrameworkCoursesTableColumns({
                studyPlan: studyPlan,
                courses: courses
            }),
        [courses, studyPlan]
    );

    const data = React.useMemo(() => {
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

    const {table} = useDataTable<FrameworkCourse>({data, columns});

    return (
        <Flex gap="xl">
            <SectionsTree table={table} studyPlan={studyPlan}/>

            <Flex direction="column" style={{flex: 1}} gap="sm">
                <Group justify="space-between">
                    <FrameworkCoursesSearch table={table}/>

                    <Group gap="sm">
                        <RemoveStudyPlanCoursesButton studyPlan={studyPlan} table={table}/>
                        <CourseSearch studyPlan={studyPlan}/>
                    </Group>
                </Group>

                <DataTable table={table}/>

                <Group justify="space-between">
                    <FilteredSectionIndicator table={table}/>
                    <FrameworkCoursesTablePagination table={table}/>
                </Group>
            </Flex>
        </Flex>
    );
}

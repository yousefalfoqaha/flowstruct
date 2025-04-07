import {Flex, Group} from "@mantine/core";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {SectionsTree} from "@/features/study-plan/components/SectionsTree.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useFrameworkCoursesTable} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";
import {FrameworkCoursesTablePagination} from "@/features/study-plan/components/FrameworkCoursesTablePagination.tsx";
import {RemoveStudyPlanCoursesButton} from "@/features/study-plan/components/RemoveStudyPlanCoursesButton.tsx";
import {FrameworkCoursesSearch} from "@/features/study-plan/components/FrameworkCoursesSearch.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {FilteredSectionIndicator} from "@/features/study-plan/components/FilteredSectionIndicator.tsx";

export function FrameworkCoursesTable() {
    const {data: studyPlan} = useStudyPlan();
    const {table} = useFrameworkCoursesTable(studyPlan);

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
                    <FilteredSectionIndicator table={table} />
                    <FrameworkCoursesTablePagination table={table}/>
                </Group>
            </Flex>
        </Flex>
    );
}

import {Eye} from "lucide-react";
import {Flex, Group, Text} from "@mantine/core";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {SectionsTree} from "@/features/study-plan/components/SectionsTree.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useFrameworkCoursesTable} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";
import {FrameworkCoursesTablePagination} from "@/features/study-plan/components/FrameworkCoursesTablePagination.tsx";
import {RemoveStudyPlanCoursesButton} from "@/features/study-plan/components/RemoveStudyPlanCoursesButton.tsx";
import {FrameworkCoursesSearch} from "@/features/study-plan/components/FrameworkCoursesSearch.tsx";
import {useSelectedSection} from "@/features/study-plan/hooks/useSelectedSection.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export function FrameworkCoursesTable() {
    const {data: studyPlan} = useStudyPlan();
    const {table} = useFrameworkCoursesTable({studyPlan});
    const selectedSection = useSelectedSection({table});

    let filteredSectionFooter: string = "All Courses";
    if (selectedSection) {
        filteredSectionFooter = `${getSectionCode(selectedSection)}: ${selectedSection.level} ${selectedSection.type} ${selectedSection.name
            ? `- ${selectedSection.name}`
            : (getSectionCode(selectedSection).split('.').length > 2 ? "- General" : "")}`;
    }

    return (
        <Flex gap="xl">
            <SectionsTree
                studyPlan={studyPlan}
                table={table}
                selectedSection={selectedSection}
            />

            <Flex direction="column" style={{flex: 1}} gap="sm">
                <Group justify="space-between">
                    <FrameworkCoursesSearch table={table}/>

                    <Group gap="sm">
                        <RemoveStudyPlanCoursesButton studyPlan={studyPlan} table={table}/>
                        <CourseSearch studyPlan={studyPlan} focusedSection={selectedSection}/>
                    </Group>
                </Group>

                <DataTable table={table}/>

                <Group justify="space-between">
                    <Group gap="sm">
                        <Eye size={14} color="gray"/>
                        <Text c="dimmed" size="sm">{filteredSectionFooter}</Text>
                    </Group>

                    <FrameworkCoursesTablePagination table={table}/>
                </Group>
            </Flex>
        </Flex>
    );
}

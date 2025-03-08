import {Section} from "@/features/study-plan/types.ts";
import {Flex, Group} from "@mantine/core";
import React from "react";
import {SectionsList} from "@/features/study-plan/components/SectionsList.tsx";
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";

export const SectionsTab = React.memo(({sections}: { sections: Section[] }) => {
    return (
        <Flex direction="column" gap="md">
            <Group justify="space-between" align="center">
                <SectionsList sections={sections}/>
                <CourseSearch/>
            </Group>
            <FrameworkCoursesTable/>
        </Flex>
    );
});

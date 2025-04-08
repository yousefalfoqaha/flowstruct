import {Eye} from "lucide-react";
import {Group, Text} from "@mantine/core";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {useSelectedSection} from "@/features/study-plan/hooks/useSelectedSection.ts";
import {Table} from "@tanstack/react-table";
import {FrameworkCourse} from "@/shared/hooks/useDataTable.ts";

type FilteredSectionIndicator = {
    table: Table<FrameworkCourse>;
}

export function FilteredSectionIndicator({table}: FilteredSectionIndicator) {
    const {selectedSection} = useSelectedSection(table);

    let filteredSectionFooter: string = "All Courses";
    if (selectedSection) {
        filteredSectionFooter = `${getSectionCode(selectedSection)}: ${selectedSection.level} ${selectedSection.type} ${selectedSection.name
            ? `- ${selectedSection.name}`
            : (getSectionCode(selectedSection).split('.').length > 2 ? "- General" : "")}`;
    }

    return (
        <Group gap="sm">
            <Eye size={14} color="gray"/>
            <Text c="dimmed" size="sm">{filteredSectionFooter}</Text>
        </Group>
    );
}

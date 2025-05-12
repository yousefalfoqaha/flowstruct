import {Group, Loader, Menu, ScrollArea, Text} from "@mantine/core";
import {useMoveCourseToSection} from "@/features/study-plan/hooks/useMoveCourseToSection.ts";
import {getSectionCode} from "@/utils/getSectionCode.ts";
import {Check} from "lucide-react";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

type SectionsComboboxProps = {
    courseId: number;
    sectionId: number;
}

export function SectionsMenuItems({courseId, sectionId}: SectionsComboboxProps) {
    const moveCourseToSection = useMoveCourseToSection();
    const {data: studyPlan} = useStudyPlan();

    const handleChangeCourseSection = (sectionId: number) => {
        moveCourseToSection.mutate({
            studyPlanId: studyPlan.id,
            courseId: courseId,
            sectionId: sectionId
        });
    };

    const options = studyPlan.sections
        .map((section) => {
            const sectionCode = getSectionCode(section);
            const displayName = section.name
                ? `- ${section.name}`
                : (sectionCode.split('.').length > 2 ? "- General" : "");
            const isSelected = section.id === sectionId;

            return (
                <Menu.Item key={section.id} onClick={() => handleChangeCourseSection(section.id)}>
                    <Group gap="xs">
                        {isSelected && moveCourseToSection.isPending
                            ? <Loader size={14} color="gray"/>
                            : isSelected && (<Check color="gray" size={14}/>)
                        }
                        <Text size="sm">{sectionCode}: {section.level} {section.type} {displayName}</Text>
                    </Group>
                </Menu.Item>
            );
        });

    return (
        <ScrollArea.Autosize mah={200} type="scroll" scrollbarSize={6}>
            {options}
        </ScrollArea.Autosize>
    );
}

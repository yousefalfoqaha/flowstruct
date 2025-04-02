import {Combobox, Group, InputBase, Loader, ScrollArea, Space, Stack, Text, useCombobox} from "@mantine/core";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useMoveCourseSection} from "@/features/study-plan/hooks/useMoveCourseSection.ts";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {Check} from "lucide-react";

type SectionsComboboxProps = {
    courseId: number;
    sectionId: number;
    courseSectionCode: string;
}

export function SectionsCombobox({courseId, sectionId, courseSectionCode}: SectionsComboboxProps) {
    const combobox = useCombobox();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: {sections}} = useStudyPlan(studyPlanId);
    const moveCourseSection = useMoveCourseSection();

    const courseSection = sections.find(section => section.id === sectionId);
    if (!courseSection) return;

    const options = sections
        .sort((a, b) => {
            const codeA = getSectionCode(a);
            const codeB = getSectionCode(b);
            return codeA.localeCompare(codeB);
        })
        .map((section) => {
            const sectionCode = getSectionCode(section);
            const displayName = section.name
                ? `- ${section.name}`
                : (sectionCode.split('.').length > 2 ? "- General" : "");
            const isSelected = section.id === sectionId;

            return (
                <Combobox.Option py="xs" pr="md" value={section.id.toString()} key={section.id}>
                    <Group gap="xs">
                        {isSelected && <Check color="gray" size={14} />}
                        <Text size="sm">{sectionCode}: {section.level} {section.type} {displayName}</Text>
                    </Group>
                </Combobox.Option>
            );
        });

    const onSubmit = (sectionId: string) => {
        moveCourseSection.mutate(
            {
                studyPlanId: studyPlanId,
                courseId: courseId,
                sectionId: parseInt(sectionId)
            },
            {
                onSuccess: () => {
                    combobox.closeDropdown();
                }
            }
        );
    }

    return (
        <Combobox
            store={combobox}
            width="auto"
            shadow="lg"
            position="left-start"
            onOptionSubmit={onSubmit}
        >
            <Combobox.Target withAriaAttributes={false}>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    size="xs"
                    rightSection={moveCourseSection.isPending ? <Loader size="xs" color="gray" /> : <Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                >
                    <Text size="xs" >{courseSectionCode}</Text>
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={300} type="scroll" scrollbarSize={6}>
                        {options}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

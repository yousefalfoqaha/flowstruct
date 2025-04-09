import {Combobox, Group, InputBase, Loader, ScrollArea, Text, useCombobox} from "@mantine/core";
import {useMoveCourseSection} from "@/features/study-plan/hooks/useMoveCourseSection.ts";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {Check} from "lucide-react";
import {Section} from "@/features/study-plan/types.ts";

type SectionsComboboxProps = {
    courseId: number;
    sectionId: number;
    studyPlanId: number;
    sections: Section[];
    courseSectionCode: string;
}

export function SectionsCombobox({
                                     courseId,
                                     sections,
                                     studyPlanId,
                                     sectionId,
                                     courseSectionCode
                                 }: SectionsComboboxProps) {
    const combobox = useCombobox();
    const moveCourseSection = useMoveCourseSection();

    const options = sections
        .map((section) => {
            const sectionCode = getSectionCode(section);
            const displayName = section.name
                ? `- ${section.name}`
                : (sectionCode.split('.').length > 2 ? "- General" : "");
            const isSelected = section.id === sectionId;

            return (
                <Combobox.Option py="xs" pr="md" value={section.id.toString()} key={section.id}>
                    <Group gap="xs">
                        {isSelected && <Check color="gray" size={14}/>}
                        <Text size="sm">{sectionCode}: {section.level} {section.type} {displayName}</Text>
                    </Group>
                </Combobox.Option>
            );
        });

    const handleChangeCourseSection = (sectionId: string) => moveCourseSection.mutate({
            studyPlanId: studyPlanId,
            courseId: courseId,
            sectionId: parseInt(sectionId)
        },
        {onSuccess: () => combobox.closeDropdown()}
    );

    return (
        <Combobox
            store={combobox}
            width="auto"
            shadow="lg"
            position="left-start"
            onOptionSubmit={handleChangeCourseSection}
        >
            <Combobox.Target withAriaAttributes={false}>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    size="xs"
                    rightSection={moveCourseSection.isPending ? <Loader size="xs" color="gray"/> : <Combobox.Chevron/>}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                >
                    <Text size="xs">{courseSectionCode}</Text>
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

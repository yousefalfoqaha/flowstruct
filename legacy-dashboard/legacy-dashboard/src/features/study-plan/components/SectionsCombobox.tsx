import {Combobox, InputBase, Loader, ScrollArea, Text, useCombobox} from "@mantine/core";
import {useMoveCourseSection} from "@/features/study-plan/hooks/useMoveCourseSection.ts";
import {ReactElement} from "react";

type SectionsComboboxProps = {
    courseId: number;
    sectionOptions: ReactElement;
    studyPlanId: number;
    courseSectionCode: string;
}

export function SectionsCombobox({courseId, studyPlanId, sectionOptions, courseSectionCode}: SectionsComboboxProps) {
    const combobox = useCombobox();
    const moveCourseSection = useMoveCourseSection();

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

    console.log('as')

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
                        {sectionOptions}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

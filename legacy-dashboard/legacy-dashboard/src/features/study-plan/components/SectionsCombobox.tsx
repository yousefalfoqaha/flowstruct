import {Badge, Combobox, Group, Loader, ScrollArea, Text, useCombobox} from "@mantine/core";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useMoveCourseSection} from "@/features/study-plan/hooks/useMoveCourseSection.ts";
import {getSectionCode} from "@/lib/getSectionCode.ts";

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

    const options = sections.map((section) => (
        <Combobox.Option value={section.id.toString()} key={section.id}>
            <Group gap="xs">
                <Badge variant={section.id === sectionId ? 'filled' : 'outline'}>
                    {getSectionCode(section)}
                </Badge>
                <div>
                    <Text fw={section.id === sectionId ? 500 : 'normal'}>
                        {section.level} {section.type}{" "}
                        {section.name ? `- ${section.name}` : ""}
                    </Text>
                    <Text c="dimmed" size="xs">
                        {section.requiredCreditHours} Credit Hours Required
                    </Text>
                </div>
            </Group>
        </Combobox.Option>
    ));

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
            position="bottom-end"
            width={100}
            onOptionSubmit={onSubmit}
        >
            <Combobox.Target withAriaAttributes={false}>
                <Badge
                    variant="outline"
                    onClick={() => combobox.toggleDropdown()}
                    rightSection={moveCourseSection.isPending ? <Loader size={14}/> : <Combobox.Chevron size="xs" />}
                >
                    {courseSectionCode}
                </Badge>
            </Combobox.Target>

            <Combobox.Dropdown w={600}>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={300} type="scroll" scrollbarSize={6}>
                        {options}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
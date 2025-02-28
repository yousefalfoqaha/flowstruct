import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {SectionAccordion} from "@/features/study-plan/components/SectionAccordion.tsx";
import {Section} from "@/features/study-plan/types.ts";
import {Accordion, Flex, Group, Title} from "@mantine/core";

export function SectionsTab({sections}: { sections: Section[] }) {
    return (
        <>
            <Flex direction="column" gap="md">
                <Group justify="space-between">
                    <Title>All Section</Title>
                    <CreateSectionModal/>
                </Group>

                <Accordion onChange={() => {}} chevronPosition="left">
                    {sections.map((section, index) => (
                        <SectionAccordion key={section.id} section={section} index={index + 1}/>
                    ))}
                </Accordion>
            </Flex>
        </>
    );
}
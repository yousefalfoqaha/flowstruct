import {Pencil, Trash} from "lucide-react";
import {Section} from "@/features/study-plan/types.ts";
import {
    Accordion,
    AccordionControlProps,
    ActionIcon,
    Center,
    Text,
    Flex,
    Loader
} from "@mantine/core";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import {useParams} from "@tanstack/react-router";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";
import {SectionCoursesTable} from "@/features/study-plan/components/SectionCoursesTable.tsx";

type SectionTableProps = {
    section: Section;
    index: number;
};

function AccordionControl({section, ...props}: AccordionControlProps & { section: Section }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const deleteSection = useDeleteSection();

    const isDeleting = deleteSection.isPending && deleteSection.variables.sectionId === section.id;

    return (
        <Center>
            <Accordion.Control {...props} />
            <Flex pr={15} gap="sm">
                <CourseSearch section={section}/>

                <ActionIcon
                    variant="light"
                    size="md"
                    onClick={() =>
                        modals.open({
                            title: `Edit ${section.level} ${section.type} ${section.name ? `- ${section.name}` : ''} Details`,
                            children: <EditSectionDetailsModal studyPlanId={studyPlanId} section={section}/>,
                            centered: true
                        })
                    }
                >
                    <Pencil size={18}/>
                </ActionIcon>

                <ActionIcon
                    variant="light"
                    size="md"
                    disabled={isDeleting}
                    children={isDeleting ? <Loader size={18}/> : <Trash size={18}/>}
                    onClick={() =>
                        modals.openConfirmModal({
                            title: 'Please confirm your action',
                            children: (
                                <Text size="sm">
                                    Deleting this section will remove all of its courses from the program map as well,
                                    are you absolutely
                                    sure?
                                </Text>
                            ),
                            labels: {confirm: 'Confirm', cancel: 'Cancel'},
                            onConfirm: () => deleteSection.mutate({
                                studyPlanId: studyPlanId,
                                sectionId: section.id
                            })
                        })
                    }
                >
                </ActionIcon>
            </Flex>
        </Center>
    );
}

export function SectionAccordion({section, index}: SectionTableProps) {
    return (
        <Accordion.Item value={`section-${section.id}`}>
            <AccordionControl section={section} mr="sm">
                <Text size="lg">
                    Section {index} - {section.level} {section.type} {section.name ? `- ${section.name}` : ""}
                </Text>

                <Text c="dimmed">
                    {section.requiredCreditHours} Cr. Hrs Required
                </Text>
            </AccordionControl>

            <Accordion.Panel>
                <SectionCoursesTable section={section}/>
            </Accordion.Panel>
        </Accordion.Item>
    );
}

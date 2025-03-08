import {Section} from "@/features/study-plan/types.ts";
import {ActionIcon, Badge, Button, Combobox, Flex, Group, Loader, Text, useCombobox} from "@mantine/core";
import {List, Pencil, Trash} from "lucide-react";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useParams} from "@tanstack/react-router";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";

export function SectionsList({sections}: { sections: Section[] }) {
    const combobox = useCombobox();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const deleteSection = useDeleteSection();


    const options = sections.map((section, index) => {
        const isDeleting = deleteSection.isPending && deleteSection.variables.sectionId === section.id;

        return (
            <Combobox.Option value={section.id.toString()} key={section.id}>
                <Group justify="space-between">
                    <Group>
                        <Badge variant="outline">{index}.{index + 1}.1</Badge>
                        <div>
                            <Text>{section.level} {section.type} {section.name ? `- ${section.name}` : ''}</Text>
                            <Text c="dimmed" size="xs">{section.requiredCreditHours} Credit Hours Required</Text>
                        </div>
                    </Group>

                    <Flex pr={15} gap="sm">
                        <ActionIcon
                            variant="light"
                            size="md"
                            onClick={() => {
                                combobox.closeDropdown();
                                modals.open({
                                    title: `Edit ${section.level} ${section.type} ${section.name ? `- ${section.name}` : ''} Details`,
                                    children: <EditSectionDetailsModal studyPlanId={studyPlanId} section={section}/>,
                                    centered: true
                                })
                            }}
                        >
                            <Pencil size={18}/>
                        </ActionIcon>

                        <ActionIcon
                            variant="light"
                            size="md"
                            disabled={isDeleting}
                            children={isDeleting ? <Loader size={18}/> : <Trash size={18}/>}
                            onClick={() => {
                                combobox.closeDropdown();
                                modals.openConfirmModal({
                                    title: 'Please confirm your action',
                                    children: (
                                        <Text size="sm">
                                            Deleting this section will remove all of its courses from the program map as
                                            well,
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
                            }}
                        >
                        </ActionIcon>
                    </Flex>
                </Group>
            </Combobox.Option>
        );
    });

    return (
        <>
            <Combobox position="bottom-start" shadow="md" store={combobox} width="max-content">
                <Combobox.Target>
                    <Button
                        leftSection={<List size={18}/>}
                        onClick={() => combobox.toggleDropdown()}
                    >
                        Manage Sections
                    </Button>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>
                        <Combobox.Header>
                            <CreateSectionModal closeDropdown={() => combobox.closeDropdown()}/>
                        </Combobox.Header>
                        {options}

                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}

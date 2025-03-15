import {Section} from "@/features/study-plan/types.ts";
import {
    ActionIcon,
    Badge,
    Button,
    Combobox,
    Flex,
    Group,
    Loader,
    ScrollArea,
    Text,
    useCombobox
} from "@mantine/core";
import {List, Pencil, Trash} from "lucide-react";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useParams} from "@tanstack/react-router";
import {modals} from "@mantine/modals";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import React from "react";
import {getSectionCode} from "@/lib/getSectionCode.ts";

export function SectionsList({sections}: { sections: Section[] }) {
    const deleteSection = useDeleteSection();

    const combobox = useCombobox();
    const [createModalOpened, setCreateModalOpened] = React.useState(false);

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    const sortedSections = sections.sort((a, b) => {
        const codeA = getSectionCode(a);
        const codeB = getSectionCode(b);
        return codeA.localeCompare(codeB);
    });

    const options = sortedSections.map(section => {
        const isDeleting =
            deleteSection.isPending && deleteSection.variables.sectionId === section.id;

        return (
            <Combobox.Option value={section.id.toString()} key={section.id}>
                <Group justify="space-between">
                    <Group gap="xs">
                        <Badge variant="outline">
                            {getSectionCode(section)}
                        </Badge>
                        <div>
                            <Text>
                                {section.level} {section.type}{" "}
                                {section.name ? `- ${section.name}` : ""}
                            </Text>
                            <Text c="dimmed" size="xs">
                                {section.requiredCreditHours} Credit Hours Required
                            </Text>
                        </div>
                    </Group>

                    <Flex pr={15} gap="sm">
                        <ActionIcon
                            variant="light"
                            size="md"
                            onClick={() => {
                                combobox.closeDropdown();
                                modals.open({
                                    title: `Edit ${section.level} ${section.type} ${
                                        section.name ? `- ${section.name}` : ""
                                    } Details`,
                                    children: (
                                        <EditSectionDetailsModal
                                            studyPlanId={studyPlanId}
                                            section={section}
                                        />
                                    ),
                                    centered: true
                                });
                            }}
                        >
                            <Pencil size={18}/>
                        </ActionIcon>

                        <ActionIcon
                            variant="light"
                            size="md"
                            disabled={isDeleting}
                            onClick={() => {
                                combobox.closeDropdown();
                                modals.openConfirmModal({
                                    title: "Please confirm your action",
                                    children: (
                                        <Text size="sm">
                                            Deleting this section will remove all of its courses from the
                                            program map as well, are you absolutely sure?
                                        </Text>
                                    ),
                                    labels: {confirm: "Confirm", cancel: "Cancel"},
                                    onConfirm: () =>
                                        deleteSection.mutate({
                                            studyPlanId: studyPlanId,
                                            sectionId: section.id
                                        })
                                });
                            }}
                        >
                            {isDeleting ? <Loader size={18}/> : <Trash size={18}/>}
                        </ActionIcon>
                    </Flex>
                </Group>
            </Combobox.Option>
        );
    });

    return (
        <>
            <CreateSectionModal
                opened={createModalOpened}
                setOpened={setCreateModalOpened}
            />

            <Combobox
                position="bottom-start"
                shadow="md"
                store={combobox}
                width="max-content"
            >
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
                            <Button
                                fullWidth
                                variant="subtle"
                                onClick={() => {
                                    combobox.closeDropdown();
                                    setCreateModalOpened(true);
                                }}
                                leftSection={<List size={14}/>}
                            >
                                Create Section
                            </Button>
                        </Combobox.Header>
                        <ScrollArea.Autosize mah={300} type="scroll">
                            {options}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </>
    );
}

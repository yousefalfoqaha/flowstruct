import {ActionIcon, Menu, Text} from "@mantine/core";
import {EllipsisVertical, Pencil, Trash} from "lucide-react";
import {Section} from "@/features/study-plan/types.ts";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useParams} from "@tanstack/react-router";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";

type SectionOptionsMenuProps = {
    section: Section;
    selectedSection: Section | null;
    resetSelectedSection: () => void;
}

export function SectionOptionsMenu({section, selectedSection, resetSelectedSection}: SectionOptionsMenuProps) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const deleteSection = useDeleteSection();

    if (!section) return;

    return (
        <Menu shadow="md">
            <Menu.Target>
                <ActionIcon
                    loading={deleteSection.isPending}
                    variant="white"
                    color="black"
                >
                    <EllipsisVertical size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={e => {
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
                    leftSection={<Pencil size={14}/>}
                >
                    Edit details
                </Menu.Item>

                <Menu.Item
                    color="red"
                    leftSection={<Trash size={14}/>}
                    onClick={e => {
                        e.stopPropagation();
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
                                }, {
                                    onSuccess: () => {
                                        if (section.id !== selectedSection?.id) return;
                                        resetSelectedSection();
                                    }
                                })
                        });
                    }}
                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
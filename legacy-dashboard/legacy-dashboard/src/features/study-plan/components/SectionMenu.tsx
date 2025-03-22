import {ActionIcon, Menu, Text} from "@mantine/core";
import {EllipsisVertical, Pencil, Trash} from "lucide-react";
import {Section} from "@/features/study-plan/types.ts";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useParams} from "@tanstack/react-router";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";

export function SectionMenu({section}: { section: Section }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const deleteSection = useDeleteSection();

    return (
        <Menu shadow="md">
            <Menu.Target>
                <ActionIcon
                    variant="default"
                    onClick={(e) => e.stopPropagation()}
                    styles={{
                        root: {
                            border: 'none',
                            backgroundColor: 'transparent',
                        }
                    }}
                >
                    <EllipsisVertical size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={e => {
                        e.stopPropagation();
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
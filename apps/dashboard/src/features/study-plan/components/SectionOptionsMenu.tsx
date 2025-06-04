import {ActionIcon, Menu, Text} from "@mantine/core";
import {Ellipsis, Pencil, Trash} from "lucide-react";
import {Section} from "@/features/study-plan/types.ts";
import {modals} from "@mantine/modals";
import {EditSectionDetailsModal} from "@/features/study-plan/components/EditSectionDetailsModal.tsx";
import {useDeleteSection} from "@/features/study-plan/hooks/useDeleteSection.ts";

type Props = {
    studyPlanId: number;
    section: Section;
}

export function SectionOptionsMenu({section, studyPlanId}: Props) {
    const deleteSection = useDeleteSection();

    const handleConfirm = () => deleteSection.mutate({
        studyPlanId: studyPlanId,
        sectionId: section.id
    });

    if (!section) return;

    return (
        <Menu shadow="md">
            <Menu.Target>
                <ActionIcon
                    loading={deleteSection.isPending}
                    variant="transparent"
                    color="gray"
                >
                    <Ellipsis size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => {
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
                            onConfirm: handleConfirm
                        });
                    }}
                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
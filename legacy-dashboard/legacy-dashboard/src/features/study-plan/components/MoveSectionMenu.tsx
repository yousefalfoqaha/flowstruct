import {ActionIcon, Menu} from "@mantine/core";
import {ArrowDown, ArrowUp, ChevronsUpDown} from "lucide-react";
import {MoveDirection, Section} from "@/features/study-plan/types.ts";
import {useParams} from "@tanstack/react-router";
import {useMoveSection} from "@/features/study-plan/hooks/useMoveSection.ts";

export function MoveSectionMenu({section}: { section: Section | undefined }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    const { mutate, isPending } = useMoveSection();

    if (!section) return;

    const handleClick = (direction: MoveDirection) => mutate({
        studyPlanId: studyPlanId,
        sectionId: section.id,
        direction: direction
    });

    return (
        <Menu shadow="md">
            <Menu.Target>
                <ActionIcon
                    loading={isPending}
                    variant="default"
                    onClick={(e) => e.stopPropagation()}
                    styles={{
                        root: {
                            border: 'none',
                            backgroundColor: 'transparent',
                        }
                    }}
                >
                    <ChevronsUpDown size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => handleClick(MoveDirection.UP)}
                    leftSection={<ArrowUp size={14}/>}
                >
                    Move up
                </Menu.Item>

                <Menu.Item
                    onClick={() => handleClick(MoveDirection.DOWN)}
                    leftSection={<ArrowDown size={14}/>}
                >
                    Move down
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
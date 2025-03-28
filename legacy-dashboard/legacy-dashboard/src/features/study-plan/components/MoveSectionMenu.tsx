import {ActionIcon, Menu} from "@mantine/core";
import {ArrowDown, ArrowUp, ChevronsUpDown} from "lucide-react";
import {Section} from "@/features/study-plan/types.ts";
import {useParams} from "@tanstack/react-router";

export function MoveSectionMenu({section}: { section: Section | undefined }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    if (!section) return;

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
                    <ChevronsUpDown size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<ArrowUp size={14} />}>
                    Move up
                </Menu.Item>

                <Menu.Item leftSection={<ArrowDown size={14} />}>
                    Move down
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
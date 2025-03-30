import {ActionIcon, Menu} from "@mantine/core";
import {ArrowDown, ArrowUp, ChevronsUpDown} from "lucide-react";
import {MoveDirection, Section} from "@/features/study-plan/types.ts";
import {useParams} from "@tanstack/react-router";
import {useMoveSection} from "@/features/study-plan/hooks/useMoveSection.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export function MoveSectionMenu({section}: { section: Section | undefined }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: {sections}} = useStudyPlan(studyPlanId);
    const siblingSections = sections.filter(s => s.level === section?.level && s.type === section?.type);

    const { mutate, isPending } = useMoveSection();

    if (!section) return;

    const handleClick = (direction: MoveDirection) => mutate({
        studyPlanId: studyPlanId,
        sectionId: section.id,
        direction: direction
    });

    return (
        <Menu shadow="md" withArrow position="left">
            <Menu.Target>
                <ActionIcon
                    loading={isPending}
                    variant="white"
                    color="black"
                >
                    <ChevronsUpDown size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    disabled={section.position <= 1}
                    onClick={() => handleClick(MoveDirection.UP)}
                    leftSection={<ArrowUp size={14}/>}
                >
                    Move up
                </Menu.Item>

                <Menu.Item
                    disabled={section.position === siblingSections.length}
                    onClick={() => handleClick(MoveDirection.DOWN)}
                    leftSection={<ArrowDown size={14}/>}
                >
                    Move down
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
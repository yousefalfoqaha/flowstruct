import {ActionIcon, Menu} from "@mantine/core";
import {ArrowDown, ArrowUp, ChevronsUpDown} from "lucide-react";
import {MoveDirection, Section} from "@/features/study-plan/types.ts";
import {useMoveSection} from "@/features/study-plan/hooks/useMoveSection.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export function MoveSectionMenu({section}: { section: Section | undefined }) {
    const {data: studyPlan} = useStudyPlan();
    const {mutate, isPending} = useMoveSection();

    const siblingSections = studyPlan.sections.filter(s => s.level === section?.level && s.type === section?.type);
    if (!section) return;

    const handleClick = (direction: MoveDirection) => mutate({
        studyPlanId: studyPlan.id,
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
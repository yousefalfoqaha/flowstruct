import {ActionIcon, Avatar, Burger, Button, Group, MantineSize} from "@mantine/core";
import {StudyPlanBreadcrumbs} from "@/features/study-plan/components/StudyPlanBreadcrumbs.tsx";
import {Eye, EyeOff, LogOut, Upload} from "lucide-react";
import {useToggleStudyPlanVisibility} from "@/features/study-plan/hooks/useToggleStudyPlanVisibility.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";

type StudyPlanHeaderProps = {
    studyPlan: StudyPlan;
    toggleSidebar: () => void;
    mobileBreakpoint: MantineSize;
}

export function StudyPlanHeader({studyPlan, toggleSidebar, mobileBreakpoint}: StudyPlanHeaderProps) {
    const toggleVisibility = useToggleStudyPlanVisibility();

    return (
        <Group justify="space-between">
            <Group gap="xl">
                <Burger
                    onClick={toggleSidebar}
                    hiddenFrom={mobileBreakpoint}
                    size="sm"
                />

                <StudyPlanBreadcrumbs/>
            </Group>

            <Group gap="lg">
                <Button
                    radius="xl"
                    variant="default"
                    leftSection={studyPlan.isPrivate ? <Eye size={18}/> : <EyeOff size={18}/>}
                    size="xs"
                    onClick={() => toggleVisibility.mutate(studyPlan.id)}
                >
                    Make {studyPlan.isPrivate ? 'Public' : 'Private'}
                </Button>
                <Button radius="xl" variant="default" leftSection={<Upload size={18}/>} size="xs">Update
                    Page</Button>


                <Avatar
                    color="blue"
                    variant="transparent"
                    radius="xl"
                />

                <ActionIcon
                    size="sm"
                    variant="transparent"
                >
                    <LogOut/>
                </ActionIcon>
            </Group>
        </Group>
    );
}
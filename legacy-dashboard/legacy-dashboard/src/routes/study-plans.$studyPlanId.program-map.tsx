import {createFileRoute} from '@tanstack/react-router'
import {StudyPlanHeader} from "@/features/study-plan/components/StudyPlanHeader.tsx";
import {Flex} from "@mantine/core";
import {ProgramMapTab} from "@/features/study-plan/components/ProgramMapTab.tsx";

export const Route = createFileRoute('/study-plans/$studyPlanId/program-map')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Flex direction="column" gap="xl">
            <StudyPlanHeader title={'Program Map'}/>

            <ProgramMapTab />
        </Flex>
    )
}

import {createFileRoute} from '@tanstack/react-router'
import {StudyPlanHeader} from "@/features/study-plan/components/StudyPlanHeader.tsx";
import {Flex} from "@mantine/core";
import {ProgramMap} from "@/features/study-plan/components/ProgramMap.tsx";

export const Route = createFileRoute('/study-plans/$studyPlanId/program-map')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Flex direction="column" gap="xl">
            <StudyPlanHeader title={'Program Map'}/>

            <ProgramMap />
        </Flex>
    )
}

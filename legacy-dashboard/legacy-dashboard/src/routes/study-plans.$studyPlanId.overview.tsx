import {createFileRoute} from '@tanstack/react-router'
import {StudyPlanHeader} from "@/features/study-plan/components/StudyPlanHeader.tsx";
import {Flex} from "@mantine/core";

export const Route = createFileRoute('/study-plans/$studyPlanId/overview')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Flex direction="column" gap="xl">
            <StudyPlanHeader title={'Overview'}/>
        </Flex>
    );
}

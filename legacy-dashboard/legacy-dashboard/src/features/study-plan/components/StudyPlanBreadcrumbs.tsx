import {ActionIcon, Breadcrumbs, Button} from '@mantine/core';
import {ChevronRight, Home} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export function StudyPlanBreadcrumbs() {
    const {data: studyPlan} = useStudyPlan();
    const {data: program} = useProgram();

    return (
        <>
            <Breadcrumbs separator={<ChevronRight size={14}/>} separatorMargin={5}>
                <Link to="/">
                    <ActionIcon mr="xs" size="compact-md" color="gray" variant="transparent">
                        <Home size={18} />
                    </ActionIcon>
                </Link>
                <Link to="/">
                    <Button size="compact-md" variant="transparent">
                        All Programs
                    </Button>
                </Link>
                <Link
                    to="/programs/$programId/study-plans"
                    params={{programId: program.id.toString()}}
                >
                    <Button size="compact-md" variant="transparent">
                        {program.degree} {program.name}
                    </Button>
                </Link>
                <Link
                    to="/study-plans/$studyPlanId/overview"
                    params={{studyPlanId: studyPlan.id.toString()}}
                >
                    <Button size="compact-md" variant="transparent">
                        {studyPlan.year}/{studyPlan.year + 1} {studyPlan.track && `- ${studyPlan.track}`}
                    </Button>
                </Link>
            </Breadcrumbs>
        </>
    );
}
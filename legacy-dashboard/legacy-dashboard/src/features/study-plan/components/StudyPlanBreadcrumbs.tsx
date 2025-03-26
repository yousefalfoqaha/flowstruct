import {Breadcrumbs, Button} from '@mantine/core';
import {ChevronRight} from "lucide-react";
import {Link, useParams} from "@tanstack/react-router";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export function StudyPlanBreadcrumbs() {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: program} = useProgram(studyPlan.program);

    return (
        <>
            <Breadcrumbs separator={<ChevronRight size={14}/>} separatorMargin="xs" mt="xs">
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
import {Breadcrumbs, Anchor} from '@mantine/core';
import {ChevronRight} from "lucide-react";
import {Link, useParams} from "@tanstack/react-router";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

const items = [
    {title: 'All Programs', href: '/'},
    {title: 'B.Sc. Electrical Engineering', href: '#'},
    {title: '2023/2024 5G Track', href: '#'},
].map((item, index) => (
    <Link to={item.href} key={index}>
        {item.title}
    </Link>
));

export function StudyPlanBreadcrumbs() {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: program} = useProgram(studyPlan.program);

    return (
        <>
            <Breadcrumbs separator={<ChevronRight size={14}/>} separatorMargin="md" mt="xs">
                <Link to="/">
                    All Programs
                </Link>
                <Link
                    to="/programs/$programId/study-plans"
                    params={{programId: program.id.toString()}}
                >
                    {program.degree} {program.name}
                </Link>
                <Link
                    to="/study-plans/$studyPlanId/overview"
                    params={{studyPlanId: studyPlan.id.toString()}}
                >
                    {studyPlan.year}/{studyPlan.year + 1} {studyPlan.track && `- ${studyPlan.track}`}
                </Link>
            </Breadcrumbs>
        </>
    );
}
import {useSuspenseQuery} from "@tanstack/react-query";
import {getProgramQuery} from "@/features/program/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export const useStudyPlanProgram = () => {
    const {data: {program}} = useStudyPlan();

    return useSuspenseQuery(getProgramQuery(program));
}

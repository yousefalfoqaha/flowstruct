import {CoursePlacement} from "@/features/study-plan/types.ts";

export const getPlacementFromTermIndex = (termIndex: number): Pick<CoursePlacement, 'year' | 'semester'> => {
    const year = Math.ceil((termIndex + 1) / 3);
    const semester = ((termIndex) % 3) + 1;
    return {year, semester};
}

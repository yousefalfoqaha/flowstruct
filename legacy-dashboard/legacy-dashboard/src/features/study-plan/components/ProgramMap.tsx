import {Affix, Button, ScrollArea, Transition} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import {X} from "lucide-react";
import classes from "./ProgramMap.module.css";
import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {CoursePlacementMultiSelect} from "@/features/study-plan/components/CoursePlacementMultiSelect.tsx";
import {getPlacementFromTermIndex} from "@/utils/getPlacementFromTermIndex.ts";

export function ProgramMap() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();
    const {movingCourse, moveCourse} = useProgramMap();

    const semesterTypes = ["First", "Second", "Summer"] as const;
    const SEMESTERS_PER_YEAR = 3;

    const semesterLengths: number[] = Array(studyPlan.duration * SEMESTERS_PER_YEAR).fill(1);

    Object.values(studyPlan.coursePlacements).map(placement => {
        const termIndex = (placement.year - 1) * SEMESTERS_PER_YEAR + (placement.semester - 1);
        semesterLengths[termIndex] += placement.span;
    });

    const programMapRows = Math.max(...semesterLengths);

    return (
        <>
            <Affix position={{bottom: 20, right: 20}}>
                <Transition transition="slide-left" mounted={!!movingCourse} keepMounted>
                    {(transitionStyles) => {
                        const course = courses[movingCourse ?? -1];
                        return (
                            <Button
                                leftSection={<X size={16}/>}
                                style={transitionStyles}
                                onClick={() => moveCourse(null)}
                            >
                                Moving {course?.code || ''}
                            </Button>
                        );
                    }}
                </Transition>
            </Affix>

            <ScrollArea offsetScrollbars type="never">
                <div
                    style={{
                        gridTemplateColumns: `repeat(${studyPlan.duration * semesterTypes.length}, 1fr)`,
                        gridTemplateRows: `repeat(${programMapRows}, 1fr)`
                    }}
                    className={classes.programMap}
                >
                    {Object.entries(studyPlan.coursePlacements).map(([courseId, placement]) => {
                        const course = courses[Number(courseId)];
                        if (!course) return;

                        const termIndex = (placement.year - 1) * SEMESTERS_PER_YEAR + (placement.semester - 1);

                        return (
                            <div key={courseId} style={{gridColumn: termIndex + 1, gridRow: placement.row}}>
                                <CourseCard course={course}/>
                            </div>
                        );
                    })}

                    {semesterLengths.map((semesterLength, termIndex) => {
                        return (
                            <div key={termIndex} style={{gridColumn: termIndex + 1, gridRow: semesterLength}}>
                                <CoursePlacementMultiSelect placement={getPlacementFromTermIndex(termIndex)}/>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </>
    );
}

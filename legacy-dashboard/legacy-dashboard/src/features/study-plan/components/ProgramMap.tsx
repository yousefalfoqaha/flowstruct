import {Affix, Button, ScrollArea, Transition} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import {X} from "lucide-react";
import classes from "./ProgramMap.module.css";
import {CourseCard} from "@/features/course/components/CourseCard.tsx";

export function ProgramMap() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();
    const {movingCourse, moveCourse} = useProgramMap();

    const academicYears = Array.from({length: studyPlan.duration}, (_, i) => i + 1);
    const SEMESTERS_PER_YEAR = 3;
    const semesterTypes = ["First", "Second", "Summer"] as const;

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
                        gridTemplateRows: `repeat(${})`
                    }}
                    className={classes.programMap}
                >
                    <div style={{gridColumn: 1, gridRow: 7}}>
                        <CourseCard course={courses[45]} />
                    </div>
                </div>
            </ScrollArea>
        </>
    );
}

import {ScrollArea} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import classes from "./ProgramMap.module.css";
import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {CoursePlacementMultiSelect} from "@/features/study-plan/components/CoursePlacementMultiSelect.tsx";
import {getPlacementFromTermIndex} from "@/utils/getPlacementFromTermIndex.ts";
import {getTermIndexFromPlacement} from "@/utils/getTermIndexFromPlacement.ts";
import {DropIndicator} from "@/features/study-plan/components/DropIndicator.tsx";

export function ProgramMap() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();
    const {dragHandlers} = useProgramMap();

    const semesterTypes = ["First", "Second", "Summer"] as const;
    const SEMESTERS_PER_YEAR = 3;

    const semesterLengths: number[] = Array(studyPlan.duration * SEMESTERS_PER_YEAR).fill(1);

    Object.values(studyPlan.coursePlacements).map(placement => {
        const termIndex = getTermIndexFromPlacement(placement);
        semesterLengths[termIndex] += placement.span;
    });

    const programMapRows = Math.max(...semesterLengths);

    return (
        <ScrollArea offsetScrollbars type="never">
            <div
                onDragOver={dragHandlers.onDragOver}
                onDragLeave={dragHandlers.onDragLeave}
                style={{
                    gridTemplateColumns: `repeat(${studyPlan.duration * semesterTypes.length}, 1fr)`,
                    gridTemplateRows: `repeat(${programMapRows}, 1fr)`
                }}
                className={classes.programMap}
            >
                {Object.entries(studyPlan.coursePlacements).map(([courseId, placement]) => {
                    const course = courses[Number(courseId)];
                    if (!course) return;

                    const termIndex = getTermIndexFromPlacement(placement);

                    return (
                        <div
                            key={courseId}
                            className={classes.cell}
                            style={{
                                gridColumn: termIndex + 1,
                                gridRow: `${placement.row} / span ${placement.span}`
                            }}
                        >
                            <CourseCard
                                course={course}
                                placement={placement}
                            />
                        </div>
                    );
                })}

                {semesterLengths.map((semesterLength, termIndex) => {
                    return (
                        <div
                            key={termIndex}
                            className={classes.cell}
                            style={{gridColumn: termIndex + 1, gridRow: semesterLength}}
                        >
                            <DropIndicator placement={getPlacementFromTermIndex(termIndex)} />
                            <CoursePlacementMultiSelect placement={getPlacementFromTermIndex(termIndex)}/>
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
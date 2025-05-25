import {ScrollArea} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import classes from "./ProgramMap.module.css";
import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {CoursePlacementMultiSelect} from "@/features/study-plan/components/CoursePlacementMultiSelect.tsx";
import {getPlacementFromTermIndex} from "@/utils/getPlacementFromTermIndex.ts";
import {DropIndicator} from "@/features/study-plan/components/DropIndicator.tsx";
import {createCourseGridCellMap} from "@/utils/createCourseGridCellMap.ts";
import React from "react";
import {CoursePlacement} from "@/features/study-plan/types.ts";

export function ProgramMap() {
    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();
    const {dragHandlers} = useProgramMap();

    const semesterTypes = ["First", "Second", "Summer"] as const;
    const SEMESTERS_PER_YEAR = 3;

    const {
        courseGridMap,
        gridWidth,
        gridHeight,
        coursesByTermIndex,
        columnHeights,
    } = React.useMemo(() => createCourseGridCellMap(studyPlan), [studyPlan]);

    return (
        <ScrollArea offsetScrollbars type="never">
            <div
                className={classes.headerGrid}
                style={{
                    gridTemplateColumns: `repeat(${gridWidth}, 9rem)`,
                }}
            >
                {Array.from({length: studyPlan.duration}, (_, i) => (
                    <div
                        key={`year-${i + 1}`}
                        className={`${classes.headerCell} ${classes.yearHeader}`}
                        style={{
                            gridColumn: `span ${SEMESTERS_PER_YEAR}`,
                        }}
                    >
                        Year {i + 1}
                    </div>
                ))}

                {Array.from(coursesByTermIndex.keys()).map((termIndex) => {
                    const semester = semesterTypes[getPlacementFromTermIndex(termIndex).semester - 1];

                    return (
                        <div
                            key={`semester-${termIndex}`}
                            className={`${classes.headerCell} ${classes.semesterHeader}`}
                            style={{
                                gridColumn: termIndex + 1,
                            }}
                        >
                            {semester}
                        </div>
                    );
                })}
            </div>

            <div
                onDragOver={dragHandlers.onDragOver}
                onDragLeave={dragHandlers.onDragLeave}
                className={classes.programMap}
                style={{
                    gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
                    gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
                }}
            >
                {/* Course Cards */}
                {Array.from(courseGridMap.entries()).map(
                    ([courseId, gridCell]) => {
                        const course = courses[courseId];
                        if (!course) return null;

                        return (
                            <div
                                key={courseId}
                                className={classes.cell}
                                style={{
                                    gridColumn: gridCell.column,
                                    gridRow: `${gridCell.row} / span ${gridCell.span}`,
                                }}
                            >
                                <CourseCard
                                    course={course}
                                    placement={studyPlan.coursePlacements[course.id]}
                                />
                            </div>
                        );
                    }
                )}

                {Array.from(coursesByTermIndex.entries()).map(
                    ([termIndex, termCourses]) => {
                        const placement = {
                            ...getPlacementFromTermIndex(termIndex),
                            position: termCourses.length || 1,
                            span: 1,
                        } as CoursePlacement;
                        const columnHeight = columnHeights.get(termIndex) || 1;

                        return (
                            <div
                                key={`drop-${termIndex}`}
                                className={classes.cell}
                                style={{
                                    gridColumn: termIndex + 1,
                                    gridRow: columnHeight,
                                }}
                            >
                                <DropIndicator placement={placement}/>
                                <CoursePlacementMultiSelect placement={placement}/>
                            </div>
                        );
                    }
                )}
            </div>
        </ScrollArea>
    );
}

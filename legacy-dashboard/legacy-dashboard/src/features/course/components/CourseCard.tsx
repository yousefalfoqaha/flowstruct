import {CourseSummary} from "@/features/course/types.ts";
import classes from "./CourseCard.module.css";
import {ProgramMapCourseOptions} from "@/features/study-plan/components/ProgramMapCourseOptions.tsx";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";
import {CoursePlacement} from "@/features/study-plan/types.ts";
import {DropIndicator} from "@/features/study-plan/components/DropIndicator.tsx";

type CourseCardProps = {
    course: CourseSummary;
    placement: CoursePlacement;
}

export function CourseCard({course, placement}: CourseCardProps) {
    const {movingCourse, isPlacementAllowed, dragHandlers} = useProgramMap();
    const {coursesGraph} = useCoursesGraph();

    const getContainerClass = () => {
        if (movingCourse === course.id) return classes.moving;

        if (!movingCourse) return classes.container;

        const sequences = coursesGraph.get(movingCourse);
        if (!sequences) return classes.container;

        const isRelated =
            sequences.prerequisiteSequence.has(course.id) ||
            sequences.postrequisiteSequence.has(course.id);

        if (!isPlacementAllowed(placement)) {
            return isRelated ? classes.conflict : classes.disabled;
        }

        return classes.container;
    };

    return (
        <>
            <DropIndicator placement={placement}/>
            <div
                draggable
                onDragStart={(e) => dragHandlers.onDragStart(e, course.id)}
                onDragEnd={dragHandlers.onDragEnd}
                className={getContainerClass()}
            >
                <div className={classes.header}>
                    <p className={classes.code}>{course.code}</p>
                    <p className={classes.name}>{course.name}</p>
                </div>

                <div className={classes.removeButton}>
                    <ProgramMapCourseOptions course={course}/>
                </div>

                <div className={classes.footer}>
                    <p>{course.creditHours} Cr.</p>
                    <p>{course.type}</p>
                </div>
            </div>
        </>
    );
}
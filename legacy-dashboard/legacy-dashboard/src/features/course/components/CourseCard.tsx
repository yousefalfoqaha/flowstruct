import {CourseSummary} from "@/features/course/types.ts";
import classes from "./CourseCard.module.css";
import {ActionIcon, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {ProgramMapCourseOptions} from "@/features/study-plan/components/ProgramMapCourseOptions.tsx";
import {ArrowLeftRight} from "lucide-react";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

type CourseCardProps = {
    course: CourseSummary;
}

export function CourseCard({course}: CourseCardProps) {
    const {moveCourse, movingCourse, allowedSemesters} = useProgramMap();
    const {coursesGraph} = useCoursesGraph();
    const [opened, {close, open}] = useDisclosure(false);
    const {data: studyPlan} = useStudyPlan();

    // const placement = studyPlan.coursePlacements[course.id];
    // if (!placement) return;
    //
    // const getContainerClass = () => {
    //     if (movingCourse === course.id) return classes.moving;
    //
    //     if (!movingCourse) return classes.container;
    //
    //     const sequences = coursesGraph.get(movingCourse);
    //     if (!sequences) return classes.container;
    //
    //     const isRelated =
    //         sequences.prerequisiteSequence.has(course.id) ||
    //         sequences.postrequisiteSequence.has(course.id);
    //
    //     if (!allowedSemesters.has(semesterNumber)) {
    //         return isRelated ? classes.conflict : classes.disabled;
    //     }
    //
    //     return classes.container;
    // };

    return (
        <div
            onMouseEnter={open}
            onMouseLeave={close}
            className={classes.container}
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
                <Tooltip label="Move">
                    <ActionIcon
                        onClick={() => moveCourse(course.id)}
                        variant="transparent"
                    >
                        <ArrowLeftRight size={16}/>
                    </ActionIcon>
                </Tooltip>
            </div>
        </div>
    );
}
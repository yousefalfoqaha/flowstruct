import {Course, CourseSummary} from "@/features/course/types.ts";
import classes from "./CourseCard.module.css";
import {ActionIcon, Indicator, Popover, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {ProgramMapCourseOptions} from "@/features/study-plan/components/ProgramMapCourseOptions.tsx";
import {ArrowLeftRight} from "lucide-react";
import {useProgramMap} from "@/contexts/ProgramMapContext.tsx";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";

type CourseCardProps = {
    course: CourseSummary;
    missingPrerequisites: Partial<Course>[];
    studyPlanId: number;
    semesterNumber: number;
}

export function CourseCard({course, missingPrerequisites, studyPlanId, semesterNumber}: CourseCardProps) {
    const {moveCourse, movingCourse, allowedSemesters} = useProgramMap();

    const {coursesGraph} = useCoursesGraph();

    const [opened, {close, open}] = useDisclosure(false);

    const getContainerClass = () => {
        if (movingCourse === course.id) return classes.moving;

        if (!movingCourse) return classes.container;

        const sequences = coursesGraph.get(movingCourse);
        if (!sequences) return classes.container;

        const isRelated =
            sequences.prerequisiteSequence.has(course.id) ||
            sequences.postrequisiteSequence.has(course.id);

        if (!allowedSemesters.has(semesterNumber)) {
            return isRelated ? classes.conflict : classes.disabled;
        }

        return classes.container;
    };

    return (
        <Indicator
            inline
            label="!"
            color="red"
            radius="lg"
            size={18}
            disabled={missingPrerequisites.length === 0}
            offset={3}
        >
            <Popover
                disabled={missingPrerequisites.length === 0}
                width={150}
                position="top"
                arrowPosition="side"
                withArrow
                opened={opened}
                shadow="md"
            >
                <Popover.Target>
                    <div
                        onMouseEnter={open}
                        onMouseLeave={close}
                        className={getContainerClass()}
                    >

                        <div className={classes.header}>
                            <p className={classes.code}>{course.code}</p>
                            <p className={classes.name}>{course.name}</p>
                        </div>

                        <div className={classes.removeButton}>
                            <ProgramMapCourseOptions course={course} studyPlanId={studyPlanId}/>
                        </div>

                        <div className={classes.footer}>
                            <p>{course.creditHours} Cr.</p>
                            <ActionIcon
                                onClick={() => moveCourse(course.id)}
                                variant="transparent"
                            >
                                <ArrowLeftRight size={14}/>
                            </ActionIcon>
                        </div>
                    </div>
                </Popover.Target>
                <Popover.Dropdown style={{pointerEvents: 'none'}}>
                    <Text fw={600} size="sm" c="red">
                        Prerequisites: {missingPrerequisites.map(prerequisite => prerequisite.code).join(', ')}
                    </Text>
                </Popover.Dropdown>
            </Popover>
        </Indicator>
    );
}
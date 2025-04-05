import {Course} from "@/features/course/types.ts";
import classes from "./CourseCard.module.css";
import {ActionIcon, Indicator, Popover, Text} from "@mantine/core";
import {CircleMinus} from "lucide-react";
import {useRemoveCoursePlacement} from "@/features/study-plan/hooks/useRemoveCoursePlacement.ts";
import {useDisclosure} from "@mantine/hooks";

type CourseCardProps = {
    course: Course;
    missingPrerequisites: Partial<Course>[];
    studyPlanId: number;
}

export function CourseCard({course, missingPrerequisites, studyPlanId}: CourseCardProps) {
    const removeCoursePlacement = useRemoveCoursePlacement();

    const [opened, {close, open}] = useDisclosure(false);

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
                    <div onMouseEnter={open} onMouseLeave={close} className={classes.container}>
                        <div className={classes.header}>
                            <p className={classes.code}>{course.code}</p>
                            <p className={classes.name}>{course.name}</p>
                        </div>

                        <ActionIcon
                            onClick={() => removeCoursePlacement.mutate({
                                courseId: course.id,
                                studyPlanId: studyPlanId
                            })}
                            loading={removeCoursePlacement.isPending}
                            variant="white"
                            color="red"
                            className={classes.removeButton}
                        >
                            <CircleMinus size={18}/>
                        </ActionIcon>

                        <div className={classes.footer}>
                            <p>{course.creditHours} Cr.</p>
                            <p>{course.type}</p>
                        </div>
                    </div>
                </Popover.Target>
                <Popover.Dropdown style={{pointerEvents: 'none'}}>
                    <Text fw={600} size="sm" c="red">
                        Prerequisites: {missingPrerequisites.map(prereq => prereq.code).join(', ')}
                    </Text>
                </Popover.Dropdown>
            </Popover>
        </Indicator>
    );
}

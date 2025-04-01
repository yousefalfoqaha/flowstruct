import {Course} from "@/features/course/types.ts";
import classes from "./CourseCard.module.css";
import {ActionIcon} from "@mantine/core";
import {CircleMinus} from "lucide-react";
import {useRemoveCoursePlacement} from "@/features/study-plan/hooks/useRemoveCoursePlacement.ts";
import {useParams} from "@tanstack/react-router";

export function CourseCard({course}: { course: Course }) {
    const removeCoursePlacement = useRemoveCoursePlacement();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    return (
        <div className={classes.container}>
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
    );
}

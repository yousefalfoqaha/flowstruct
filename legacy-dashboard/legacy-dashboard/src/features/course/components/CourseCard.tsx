import {Course} from "@/features/course/types.ts";
import classes from "./CourseCard.module.css";

export function CourseCard({course}: { course: Course }) {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <p className={classes.code}>{course.code}</p>
                <p className={classes.name}>{course.name}</p>
            </div>

            <div className={classes.footer}>
                <p>{course.creditHours} Cr.</p>
                <p>{course.type}</p>
            </div>
        </div>
    );
}

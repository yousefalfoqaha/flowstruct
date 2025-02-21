import {CourseCard} from "@/features/course/components/CourseCard.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";

type ProgramMapTabProps = {
    duration: number;
    coursePlacements: Record<number, number>
}

export function ProgramMapTab({duration, coursePlacements}: ProgramMapTabProps) {
    const {data: courses} = useCourseList(Object.keys(coursePlacements).map(id => parseInt(id)));

    const academicYears = Array.from({length: duration}, (_, i) => i + 1);
    const SEMESTERS_PER_YEAR = 3;
    const semesterTypes = ["First", "Second", "Summer"] as const;

    const coursesBySemester = new Map<number, number[]>(
        Array.from({length: duration * SEMESTERS_PER_YEAR}, (_, i) => [i + 1, []])
    );

    Object.entries(coursePlacements ?? {}).forEach(([courseId, semesterNum]) => {
        coursesBySemester.get(Number(semesterNum))?.push(Number(courseId));
    });

    if (!courses) return;

    return (
        <>
            <div className="overflow-auto flex gap-1">
                {academicYears.map((year) => {
                    const yearSemesters = semesterTypes.map((_, i) =>
                        year * SEMESTERS_PER_YEAR - (SEMESTERS_PER_YEAR - i) + 1
                    );

                    return (
                        <div key={year} className="space-y-1">
                            <h1 className="text-center bg-gray-500 p-1 text-white">Year {year}</h1>
                            <div className="flex gap-1">
                                {yearSemesters.map((semesterNumber, index) => {
                                    const semesterCourses = coursesBySemester.get(semesterNumber);

                                    return (
                                        <div key={semesterNumber} className="space-y-1 w-28">
                                            <h3 className="bg-gray-500 p-1 text-white text-center">
                                                <p>{semesterTypes[index]}</p>
                                                <p>{semesterCourses?.reduce((sum, courseId) => sum + (getCourse(courseId)?.creditHours || 0), 0)} Cr.
                                                    Hrs</p>
                                            </h3>
                                            {semesterCourses?.map((courseId) => {
                                                const course = courses?[courseId];
                                                if (!course) return;

                                                return (
                                                    <CourseCard key={courseId} course={course}/>
                                                );
                                            })}
                                            <Button variant="outline"
                                                    className="rounded-none h-7 shadow-none w-full">
                                                <Plus/>
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
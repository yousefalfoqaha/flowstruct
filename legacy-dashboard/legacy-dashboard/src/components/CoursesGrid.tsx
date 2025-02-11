import {StudyPlan} from "@/types";
import {CourseCard} from "@/components/CourseCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import React from "react";
import {AddCourseDialog} from "@/components/AddCourseDialog.tsx";

type CoursesGridProps = {
    studyPlan: StudyPlan;
}

export function CoursesGrid({studyPlan}: CoursesGridProps) {
    const [selectedSemester, setSelectedSemester] = React.useState<number | null>(null);

    const academicYears = Array.from({length: studyPlan.duration}, (_, i) => i + 1);
    const SEMESTERS_PER_YEAR = 3;
    const semesterTypes = ["First", "Second", "Summer"] as const;

    const coursesBySemester = new Map<number, number[]>(
        Array.from({length: studyPlan.duration * SEMESTERS_PER_YEAR}, (_, i) => [i + 1, []])
    );

    Object.entries(studyPlan.coursePlacements ?? {}).forEach(([courseId, semesterNum]) => {
        coursesBySemester.get(Number(semesterNum))?.push(Number(courseId));
    });

    return (
        <>
            {selectedSemester && <AddCourseDialog semester={selectedSemester} closeDialog={() => setSelectedSemester(null)} />
            }
            <div className="overflow-auto flex gap-1">
                {academicYears.map((year) => {
                    const yearSemesters = semesterTypes.map((_, i) =>
                        year * SEMESTERS_PER_YEAR - (SEMESTERS_PER_YEAR - i) + 1
                    );

                    return (
                        <div key={year} className="space-y-1">
                            <h1 className="text-center bg-gray-500 text-white">Year {year}</h1>
                            <div className="flex gap-1">
                                {yearSemesters.map((semesterNumber, index) => {
                                    const semesterCourses = coursesBySemester.get(semesterNumber);

                                    return (
                                        <div key={semesterNumber} className="space-y-1 w-28">
                                            <h3 className="bg-gray-500 text-white text-center">{semesterTypes[index]}</h3>
                                            {semesterCourses?.map((courseId) => {
                                                const course = studyPlan.courses[courseId];
                                                if (!course) return null;

                                                return (
                                                    <CourseCard key={courseId} course={course}/>
                                                );
                                            })}
                                            <Button variant="outline"
                                                    className="rounded-none h-7 shadow-none w-full"
                                                    onClick={() => setSelectedSemester(semesterNumber)}
                                            >
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
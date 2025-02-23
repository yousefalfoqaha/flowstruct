import {Button} from "@/shared/components/ui/button.tsx";
import {Badge} from "@/shared/components/ui/badge.tsx";
import {X} from "lucide-react";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {Section} from "@/features/study-plan/types.ts";
import {useAddCoursesToSection} from "@/features/study-plan/hooks/useAddCoursesToSection.ts";
import {Course} from "@/features/course/types.ts";
import {useParams} from "@tanstack/react-router";

type SelectedCoursesTrayProps = {
    courses: Course[];
    clearSelection: () => void;
};

export function SelectedCoursesTray({courses, clearSelection}: SelectedCoursesTrayProps) {
    const addCoursesToSection = useAddCoursesToSection();
    const {item: section, closeDialog} = useDialog<Section>();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    const totalCredits = courses.reduce((sum, course) => sum + (course.creditHours || 0), 0);

    if (!section) return;

    return (
        <div className="space-y-2 pt-4">
            <header className="flex gap-2 items-center justify-center">
                <h1>
                    {courses.length > 0
                        ? `Selected Courses - ${totalCredits} Cr.`
                        : <span className="opacity-60">No courses selected.</span>
                    }
                </h1>
                {courses.length > 0 && (
                    <Button className="ml-auto" variant="ghost" onClick={clearSelection}>
                        <X/> Clear Selection
                    </Button>
                )}
            </header>

            <div className="flex flex-wrap gap-2">
                {courses.map((course) => (
                    <Badge variant="secondary" key={course.id}>
                        {course.code} {course.name}
                    </Badge>
                ))}
            </div>

            {addCoursesToSection.isPending
                ? <ButtonLoading/>
                : <Button disabled={courses.length === 0 || addCoursesToSection.isPending}
                          onClick={() => {
                              addCoursesToSection.mutate({
                                  addedCourses: courses,
                                  sectionId: section.id,
                                  studyPlanId: studyPlanId
                              }, {
                                  onSuccess: () => closeDialog,
                                  onError: () => closeDialog()
                              });
                          }}>
                    Add Courses
                </Button>
            }
        </div>
    );
}

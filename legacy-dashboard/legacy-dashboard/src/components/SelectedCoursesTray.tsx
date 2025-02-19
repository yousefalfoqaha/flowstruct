import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {X} from "lucide-react";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {useDialog} from "@/hooks/useDialog.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {Course} from "@/types";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";

type SelectedCoursesTrayProps = {
    courses: Course[];
    clearSelection: () => void;
};

export function SelectedCoursesTray({courses, clearSelection}: SelectedCoursesTrayProps) {
    const {addCoursesToSection} = useStudyPlan();
    const {section, closeDialog} = useDialog();
    const {toast} = useToast();

    const totalCredits = courses.reduce((sum, course) => sum + (course.creditHours || 0), 0);

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
                              addCoursesToSection.mutate({addedCourses: courses, section: section}, {
                                  onSuccess: () => {
                                      closeDialog();
                                      toast({description: "Successfully added courses to section."});
                                  },
                                  onError: () => closeDialog()
                              });
                          }}>
                    Add Courses
                </Button>
            }
        </div>
    );
}

import {CourseSearch} from "@/components/CourseSearch.tsx";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader, SheetFooter} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSelectedCourses} from "@/hooks/useSelectedCourses.ts";
import {StudyPlan} from "@/types";
import {useToast} from "@/hooks/use-toast.ts";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";

type AddCourseDialogProps = {
    semester: number | null;
    closeDialog: () => void;
}

export function AddCourseDialog({semester, closeDialog}: AddCourseDialogProps) {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    const {studyPlanId} = useParams({strict: false});
    const {data: studyPlan} = useStudyPlan(parseInt(studyPlanId ?? ''));

    const addCoursesToSemesterMutation = useMutation({
        mutationFn: async (courses: number[]) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlan.id}/add-courses`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    courseIds: courses,
                    semester: semester
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred.');
            }

            return response.json();
        },
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
            closeDialog();
            toast({description: 'Successfully added courses.'});
        }),
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

    const {selectedCourses} = useSelectedCourses();

    return (
        <Sheet open={!!semester} onOpenChange={closeDialog}>
            <SheetContent
                side="left"
                className="max-h-screen h-full overflow-y-auto flex flex-col"
                style={{width: "550px", maxWidth: "550px"}}
            >
                <SheetHeader className="mb-3">
                    <SheetTitle>Add Courses to Semester {semester}</SheetTitle>
                    <SheetDescription>
                        Search courses, select them, then click add.
                    </SheetDescription>
                </SheetHeader>

                {semester && <CourseSearch semester={semester}/>}

                <SheetFooter className="mt-auto py-3">
                    <Button onClick={() =>
                        addCoursesToSemesterMutation.mutate(
                            selectedCourses.map(course => course.id)
                        )}
                    >
                        Add Courses
                    </Button>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    );
}

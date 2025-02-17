import {CourseSearch} from "@/components/CourseSearch";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader} from "@/components/ui/sheet"
import {Course, Section} from "@/types";
import {useToast} from "@/hooks/use-toast";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";

type AddCourseDialogProps = {
    section: Section;
    closeDialog: () => void;
};

export function AddCourseDialog({section, closeDialog}: AddCourseDialogProps) {
    const {toast} = useToast();
    const {addCoursesToSection} = useStudyPlan();

    return (
        <Sheet open={!!section} onOpenChange={closeDialog}>
            <SheetContent
                side="left"
                className="max-h-screen h-full overflow-y-auto flex flex-col"
                style={{width: "550px", maxWidth: "550px"}}
            >
                <SheetHeader className="mb-3">
                    <SheetTitle>
                        Add Courses to {section.level} {section.type} {section.name ? `- ${section.name}` : ""}
                    </SheetTitle>
                    <SheetDescription>
                        Search courses, select them, then click add.
                    </SheetDescription>
                </SheetHeader>
                {section && (
                    <CourseSearch onAddCourses={(addedCourses: Record<number, Course>) =>
                        addCoursesToSection.mutate(
                            {addedCourses, section}, {
                                onSuccess: () => {
                                    closeDialog();
                                    toast({description: 'Successfully added courses to section.'});
                                }
                            }
                        )}/>
                )}
            </SheetContent>
        </Sheet>
    );
}

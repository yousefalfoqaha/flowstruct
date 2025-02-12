import {CourseSearch} from "@/components/CourseSearch.tsx";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetHeader, SheetFooter} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";

type AddCourseDialogProps = {
    semester: number | null;
    closeDialog: () => void;
}

export function AddCourseDialog({semester, closeDialog}: AddCourseDialogProps) {
    return (
        <Sheet open={!!semester} onOpenChange={closeDialog}>
            <SheetContent
                side="left"
                className="max-h-screen h-full overflow-y-auto flex flex-col"
                style={{ width: "550px", maxWidth: "550px" }}
            >
                <SheetHeader className="mb-3">
                    <SheetTitle>Add Courses to Semester {semester}</SheetTitle>
                    <SheetDescription>
                        Search courses, select them, then click add.
                    </SheetDescription>
                </SheetHeader>

                    <CourseSearch />

                <SheetFooter className="mt-auto py-3">
                    <Button>Add Courses</Button>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    );
}

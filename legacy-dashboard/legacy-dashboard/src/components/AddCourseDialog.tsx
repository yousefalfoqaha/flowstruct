import {Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription} from "@/components/ui/dialog.tsx";
import {CourseSearch} from "@/components/CourseSearch.tsx";

type AddCourseDialogProps = {
    semester: number | null;
    closeDialog: () => void;
}

export function AddCourseDialog({semester, closeDialog}: AddCourseDialogProps) {
    return (
        <Dialog open={!!semester} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Courses to Semester {semester}</DialogTitle>
                    <DialogDescription>
                        Search courses to assign them sections, then click add.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <CourseSearch />
                </div>
            </DialogContent>
        </Dialog>
    );
}

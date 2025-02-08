import {Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import React from "react";

type AddCourseDialogProps = {
    semester: number | null;
    closeDialog: () => void;
}

export function AddCourseDialog({semester, closeDialog}: AddCourseDialogProps) {
    const [selectedCourses, setSelectedCourses] = React.useState<number[]>([]);

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
                    <Input placeholder="Search a course..." />
                </div>
            </DialogContent>
        </Dialog>
    );
}
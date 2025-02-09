import {Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription} from "@/components/ui/dialog.tsx";
import React from "react";
import {InfiniteScrollCourses} from "@/components/InfiniteScrollCourses.tsx";

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
                    <InfiniteScrollCourses />
                </div>
            </DialogContent>
        </Dialog>
    );
}
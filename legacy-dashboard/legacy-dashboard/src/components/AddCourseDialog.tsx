import {CourseSearch} from "@/components/CourseSearch";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import {useDialog} from "@/hooks/useDialog.ts";
import {Section} from "@/types";

export function AddCourseDialog() {
    const {dialogIsOpen, closeDialog, item: section} = useDialog<Section>();

    return (
        <Sheet open={dialogIsOpen('ADD_COURSES')} onOpenChange={closeDialog}>
            <SheetContent
                side="left"
                className="max-h-screen h-full overflow-y-auto flex flex-col"
                style={{width: "550px", maxWidth: "550px"}}
            >
                <SheetHeader className="mb-3">
                    <SheetTitle>
                        Add Courses to {section?.level} {section?.type} {section?.name ? `- ${section?.name}` : ""}
                    </SheetTitle>
                    <SheetDescription>
                        Search courses, select them, then click add.
                    </SheetDescription>
                </SheetHeader>

                <CourseSearch/>
            </SheetContent>
        </Sheet>
    );
}

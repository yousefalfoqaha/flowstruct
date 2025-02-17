import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Course } from "@/types";

type SelectedCoursesTrayProps = {
    selectedCourses: Course[];
    clearSelection: () => void;
};

export function SelectedCoursesTray({ selectedCourses, clearSelection }: SelectedCoursesTrayProps) {
    const totalCredits = selectedCourses.reduce((sum, course) => sum + (course.creditHours || 0), 0);

    return (
        <div className="space-y-2 pt-4">
            <header className="flex gap-2 items-center justify-center">
                <h1>
                    {selectedCourses.length > 0
                        ? `Selected Courses - ${totalCredits} Cr.`
                        : <span className="opacity-60">No courses selected.</span>}
                </h1>
                {selectedCourses.length > 0 && (
                    <Button className="ml-auto" variant="ghost" onClick={clearSelection}>
                        <X /> Clear Selection
                    </Button>
                )}
            </header>

            <div className="flex flex-wrap gap-2">
                {selectedCourses.map((course) => (
                    <Badge variant="secondary" key={course.id}>
                        {course.code} {course.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

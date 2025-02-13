import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {X} from "lucide-react";
import {useSelectedCourses} from "@/hooks/useSelectedCourses.ts";

type SelectedCoursesTrayProps = {
    clearSelection: () => void;
};

export function SelectedCoursesTray({clearSelection}: SelectedCoursesTrayProps) {
    const {selectedCourses} = useSelectedCourses();

    const totalCredits = selectedCourses.reduce((sum, course) => sum + (course.creditHours || 0), 0) || 0;

    return (
        <div className="space-y-2 pt-3">
            <header className="flex gap-2 items-center justify-center">
                <h1>{selectedCourses.length > 0 ? `Selected Courses - ${totalCredits} Cr.` : <p className="opacity-60">No courses selected.</p>}</h1>
                {selectedCourses.length > 0 && <Button className="ml-auto" variant="ghost" onClick={clearSelection}><X /> Clear Selection</Button>}
            </header>
            <div className="flex flex-wrap gap-2">
                {selectedCourses.map((course) => (
                    <Badge variant="secondary" key={course.id}>{course.code} {course.name}</Badge>
                ))}
            </div>
        </div>
    );
}

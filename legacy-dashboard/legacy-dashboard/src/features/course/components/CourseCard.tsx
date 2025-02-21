import {Course} from "@/features/course/types.ts";

export function CourseCard({course}: { course: Course }) {
    return (
        <div className="transition-all duration-300 ease-in-out text-xs h-24 select-none cursor-pointer relative bg-gray-100 border hover:bg-blue-50 hover:border-blue-200
               active:bg-blue-100 p-3 py-2 group">
            <h3 className="font-bold mb-0.5">{course.code}</h3>
            <p className="line-clamp-3">{course.name}</p>
            <p className="absolute bottom-1 left-1 font-semibold group-hover:opacity-50 opacity-0 transition-opacity">
                {course.creditHours} Cr.
            </p>
            <p className="absolute bottom-1 right-1 font-semibold group-hover:opacity-50 opacity-0 transition-opacity">
                {course.type}
            </p>
        </div>
    );
}
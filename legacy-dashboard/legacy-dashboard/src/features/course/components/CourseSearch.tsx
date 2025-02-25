import {MultiSelect} from "@mantine/core";
import {Section} from "@/features/study-plan/types.ts";
import React from "react";
import {Course} from "@/features/course/types.ts";
import {useSearchCoursesForm} from "@/features/course/hooks/useSearchCoursesForm.ts";

export function CourseSearch({section}: {section: Section}) {
    const [searchQuery, setSearchQuery] = React.useState<Partial<Pick<Course, "code" | "name">>>({});
    const [showResults, setShowResults] = React.useState(false);
    const form = useSearchCoursesForm();

    const handleSubmit = (data: Partial<Pick<Course, "code" | "name">>) => {
        setSearchQuery(data);
        setShowResults(true);
    };

    return (
        <MultiSelect
            placeholder="Add courses"
            searchable
            comboboxProps={{position: 'bottom', middlewares: {flip: false, shift: false}, offset: 0}}
            data={['Ja Stimmt']}
        />
    );
}

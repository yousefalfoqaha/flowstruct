import {createColumnHelper} from "@tanstack/react-table";
import {Course} from "@/features/course/types.ts";
import {Badge} from "@mantine/core";
import {CourseOptionsMenu} from "@/features/course/components/CourseOptionsMenu.tsx";

export function getCoursesTableColumns() {
    const {accessor, display} = createColumnHelper<Course>();

    return [
        accessor('code', {
            header: 'Code',
            cell: ({cell}) => <Badge variant="default">{cell.getValue()}</Badge>
        }),
        accessor('name', {
            header: 'Name'
        }),
        accessor('creditHours', {
            header: 'Credits',
            cell: ({cell}) => `${cell.getValue()} Cr.`
        }),
        accessor('ects', {
            header: 'ECTS',
            cell: ({cell}) => `${cell.getValue()} ECTS`
        }),
        accessor('lectureHours', {
            header: 'Lecture Hours',
            cell: ({cell}) => `${cell.getValue()} Hrs/Week`
        }),
        accessor('practicalHours', {
            header: 'Practical Hours',
            cell: ({cell}) => `${cell.getValue()} Hrs/Week`
        }),
        accessor('type', {
            header: 'Type'
        }),
        display({
            id: 'actions',
            header: 'Actions',
            cell: ({row}) => (
                <CourseOptionsMenu course={row.original} />
            )
        })
    ];
}
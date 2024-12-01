import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SchoolFilter} from "@/components/programs-grid/SchoolFilter.tsx";
import {DepartmentFilter} from "@/components/programs-grid/DepartmentFilter.tsx";

export function Search() {
    return (
        <div className="flex flex-row gap-2">
            <SchoolFilter />
            <DepartmentFilter />
            <Input placeholder="Search programs..." />
            <Button>Search</Button>
        </div>
    )
}
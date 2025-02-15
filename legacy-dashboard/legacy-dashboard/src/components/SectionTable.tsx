import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Course, Section} from "@/types";
import {DataTable} from "@/components/DataTable.tsx";
import {Route} from "@/routes/study-plans.$studyPlanId.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, CircleMinus, Pencil, Plus, Trash} from "lucide-react";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {useStudyPlanCourses} from "@/hooks/useStudyPlanCourses.ts";

type SectionTableProps = {
    section: Section;
    index: number;
    openEditDialog: () => void;
    openDeleteDialog: () => void;
};

export function SectionTable({section, index, openEditDialog, openDeleteDialog}: SectionTableProps) {
    const studyPlanId = parseInt(Route.useParams().studyPlanId);
    const {data: courses} = useStudyPlanCourses(studyPlanId);

    const {accessor, display} = createColumnHelper<Course>();

    const columns = [
        accessor("code", {
            header: "Code"
        }),
        accessor("name", {
            header: "Name"
        }),
        accessor("creditHours", {
            header: () => <h1 className="text-nowrap">Credit Hours</h1>
        }),
        accessor("type", {
            header: "Type"
        }),
        display({
            id: 'actions',
            header: () => <div className="flex justify-end pr-7">Actions</div>,
            cell: () => (
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost">
                        <CircleMinus className="size-4"/>
                    </Button>
                </div>
            )
        })
    ];

    const table = useReactTable({
        columns,
        data: section.courses.map(course => courses[course]),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AccordionItem value={`section-${index}`}>
            <div className="w-full flex justify-between items-center py-8 text-left">
                <div className="flex gap-4 items-center">
                    <AccordionTrigger asChild>
                        <Button variant="ghost"><ChevronDown/></Button>
                    </AccordionTrigger>
                    <header className="space-y-1">
                        <h1 className="text-lg">
                            Section {index} - {section.level} {section.type} {section.name ? `- ${section.name}` : ""}
                        </h1>
                        <p className="opacity-60 text-sm font-semibold">{section.requiredCreditHours} Credit Hours
                            Required</p>
                    </header>
                </div>
                <div className="flex gap-3 items-center">
                    <Button variant="outline" className="rounded-full w-[2.3rem]">
                        <Plus/>
                    </Button>
                    <div className="flex gap-2 justify-end">
                        <Button variant="ghost" onClick={openEditDialog}>
                            <Pencil className="size-4"/>
                        </Button>
                        <Button variant="ghost" onClick={openDeleteDialog}>
                            <Trash className="size-4"/>
                        </Button>
                    </div>
                </div>
            </div>
            <AccordionContent className="p-4">
                <DataTable table={table}/>
            </AccordionContent>
        </AccordionItem>
    );
}

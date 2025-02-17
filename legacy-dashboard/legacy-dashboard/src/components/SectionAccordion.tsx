import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Course, Section} from "@/types";
import {DataTable} from "@/components/DataTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, CircleMinus, Pencil, Plus, Trash} from "lucide-react";
import {SectionDialog} from "@/components/SectionsTab.tsx";
import {useMemo} from "react";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";

type SectionTableProps = {
    section: Section;
    index: number;
    openDialog: ({type, section}: SectionDialog) => void;
};

export function SectionAccordion({section, index, openDialog}: SectionTableProps) {
    const {courses} = useStudyPlan();

    const {accessor, display} = createColumnHelper<Course>()

    const columns = useMemo(() => {
        return [
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
    }, [accessor, display]);

    const rowData = useMemo(() => {
        return [...section.courses].map(course => courses.data[course]);
    }, [section.courses, courses]);

    const table = useReactTable({
        columns,
        data: rowData,
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
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" className="mr-2 rounded-full w-[2.3rem]" onClick={() => openDialog({type: 'ADD_COURSES', section: section})}>
                        <Plus/>
                    </Button>

                    <Button variant="ghost" onClick={() => openDialog({type: 'EDIT', section: section})}>
                        <Pencil className="size-4"/>
                    </Button>

                    <Button variant="ghost" onClick={() => openDialog({type: 'DELETE', section: section})}>
                        <Trash className="size-4"/>
                    </Button>
                </div>
            </div>
            <AccordionContent className="p-4">
                <DataTable table={table}/>
            </AccordionContent>
        </AccordionItem>
    );
}

import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Course, Section} from "@/types";
import {DataTable} from "@/components/DataTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, CircleMinus, Pencil, Plus, Trash} from "lucide-react";
import {useMemo} from "react";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {useCourses} from "@/hooks/useCourses.ts";
import {useDialog} from "@/hooks/useDialog.ts";
import {DialogType} from "@/contexts/DialogContext.tsx";

type SectionTableProps = {
    section: Section;
    index: number;
};

export function SectionAccordion({section, index}: SectionTableProps) {
    const {getCourses} = useCourses();
    const {openDialog} = useDialog<Section>();

    const {accessor, display} = createColumnHelper<Course>();

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

    const courses = useMemo(() => getCourses([...section.courses]), [section.courses]);

    const table = useReactTable({
        columns,
        data: courses,
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
                    <Button variant="outline" className="mr-2 rounded-full w-[2.3rem]"
                            onClick={() => openDialog(section, DialogType.ADD_COURSES)}>
                        <Plus/>
                    </Button>

                    <Button variant="ghost" onClick={() => openDialog(section, DialogType.EDIT)}>
                        <Pencil className="size-4"/>
                    </Button>

                    <Button variant="ghost" onClick={() => openDialog(section, DialogType.DELETE)}>
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

import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {DataTable} from "@/shared/components/DataTable.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {ChevronDown, CircleMinus, Pencil, Plus, Trash} from "lucide-react";
import {useMemo} from "react";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/components/ui/accordion.tsx";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {Section} from "@/features/study-plan/types.ts";
import {Course} from "@/features/course/types.ts";

type SectionTableProps = {
    section: Section;
    index: number;
};

export function SectionAccordion({section, index}: SectionTableProps) {
    const {data: courses} = useCourseList([...section.courses]);
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

    const table = useReactTable({
        columns,
        data: courses ?? [],
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
                            onClick={() => openDialog(section, 'ADD_COURSES')}>
                        <Plus/>
                    </Button>

                    <Button variant="ghost" onClick={() => openDialog(section, 'EDIT')}>
                        <Pencil className="size-4"/>
                    </Button>

                    <Button variant="ghost" onClick={() => openDialog(section, 'DE')}>
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

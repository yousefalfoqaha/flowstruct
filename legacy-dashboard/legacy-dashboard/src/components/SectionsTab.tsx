import {EditSectionDialog} from "@/components/EditSectionDialog.tsx";
import {CreateSectionDialog} from "@/components/CreateSectionDialog.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import React from "react";
import {Section} from "@/types";
import {DeleteSectionDialog} from "@/components/DeleteSectionDialog.tsx";
import {AddCourseDialog} from "@/components/AddCourseDialog.tsx";
import {SectionAccordion} from "@/components/SectionAccordion.tsx";

export type SectionDialog = {
    type: 'ADD_COURSES' | 'EDIT' | 'DELETE' | null;
    section: Section | null;
};

export function SectionsTab() {
    const [dialog, setDialog] = React.useState<SectionDialog>({type: null, section: null});
    const {studyPlan} = useStudyPlan();

    const closeDialog = () => setDialog({type: null, section: null});

    return (
        <>
            {dialog?.type === 'ADD_COURSES' && dialog.section && (
                <AddCourseDialog section={dialog.section} closeDialog={closeDialog}/>
            )}
            {dialog?.type === 'EDIT' && dialog.section && (
                <EditSectionDialog section={dialog.section} closeDialog={closeDialog}/>
            )}
            {dialog?.type === 'DELETE' && dialog.section && (
                <DeleteSectionDialog section={dialog.section} closeDialog={closeDialog}/>
            )}

            <header className="flex justify-between items-center">
                <h1 className="text-2xl">All Sections</h1>
                <CreateSectionDialog/>
            </header>
            <Accordion type="single">
                {studyPlan.data.sections.map((section, index) => (
                    <SectionAccordion
                        key={section.id}
                        section={section}
                        index={index + 1}
                        openDialog={({type, section}) => setDialog({type, section})}
                    />
                ))}
            </Accordion>
        </>
    );
}
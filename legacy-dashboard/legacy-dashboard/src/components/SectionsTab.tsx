import {EditSectionDialog} from "@/components/EditSectionDialog.tsx";
import {CreateSectionDialog} from "@/components/CreateSectionDialog.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {DeleteSectionDialog} from "@/components/DeleteSectionDialog.tsx";
import {AddCourseDialog} from "@/components/AddCourseDialog.tsx";
import {SectionAccordion} from "@/components/SectionAccordion.tsx";
import {DialogProvider} from "@/contexts/DialogContext.tsx";

export function SectionsTab() {
    const {studyPlan} = useStudyPlan();

    return (
        <DialogProvider>
            <AddCourseDialog/>
            <EditSectionDialog/>
            <DeleteSectionDialog/>

            <header className="flex justify-between items-center">
                <h1 className="text-2xl">All Sections</h1>
                <CreateSectionDialog/>
            </header>
            <Accordion type="single">
                {studyPlan.data.sections.map((section, index) => (
                    <SectionAccordion key={section.id} section={section} index={index + 1}/>
                ))}
            </Accordion>
        </DialogProvider>
    );
}
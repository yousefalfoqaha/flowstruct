import {EditSectionDialog} from "@/features/study-plan/components/EditSectionDialog.tsx";
import {CreateSectionForm} from "@/features/study-plan/components/CreateSectionForm.tsx";
import {Accordion} from "@/shared/components/ui/accordion.tsx";
import {DeleteSectionDialog} from "@/features/study-plan/components/DeleteSectionDialog.tsx";
import {AddCourseDialog} from "@/features/course/components/AddCourseDialog.tsx";
import {SectionAccordion} from "@/features/study-plan/components/SectionAccordion.tsx";
import {DialogProvider} from "@/contexts/DialogContext.tsx";
import {Section} from "@/features/study-plan/types.ts";

export function SectionsTab({sections}: {sections: Section[]}) {

    return (
        <DialogProvider>
            <AddCourseDialog/>
            <EditSectionDialog/>
            <DeleteSectionDialog/>

            <header className="flex justify-between items-center">
                <h1 className="text-2xl">All Sections</h1>
                <CreateSectionForm />
            </header>
            <Accordion type="single">
                {sections.map((section, index) => (
                    <SectionAccordion key={section.id} section={section} index={index + 1}/>
                ))}
            </Accordion>
        </DialogProvider>
    );
}
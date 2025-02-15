import {EditSectionDialog} from "@/components/EditSectionDialog.tsx";
import {CreateSectionDialog} from "@/components/CreateSectionDialog.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import {SectionTable} from "@/components/SectionTable.tsx";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import React from "react";
import {Section} from "@/types";
import {DeleteSectionDialog} from "@/components/DeleteSectionDialog.tsx";

type ModalState = {
    type: 'edit' | 'delete' | null;
    section: Section | null;
};

export function SectionsAccordion() {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const [modalState, setModalState] = React.useState<ModalState>({type: null, section: null});

    const closeModal = () => setModalState({type: null, section: null});

    return (
        <>
            {modalState.type === 'edit' && modalState.section && (
                <EditSectionDialog section={modalState.section} closeDialog={closeModal}/>
            )}
            {modalState.type === 'delete' && modalState.section && (
                <DeleteSectionDialog section={modalState.section} closeDialog={closeModal}/>
            )}

            <header className="flex justify-between items-center">
                <h1 className="text-2xl">All Sections</h1>
                <CreateSectionDialog/>
            </header>
            <Accordion type="multiple">
                {studyPlan.sections.map((section, index) => (
                    <SectionTable
                        key={section.id}
                        section={section}
                        index={index + 1}
                        openEditDialog={() => setModalState({type: 'edit', section})}
                        openDeleteDialog={() => setModalState({type: 'delete', section})}
                    />
                ))}
            </Accordion>
        </>
    );
}

import {sectionDetailsSchema} from "@/features/study-plan/schemas.ts";
import {Button, Flex, LoadingOverlay} from "@mantine/core";
import {SectionDetailsFormFields} from "@/features/study-plan/components/SectionDetailsFormFields.tsx";
import {Section} from "@/features/study-plan/types.ts";
import {useEditSectionDetails} from "@/features/study-plan/hooks/useEditSectionDetails.ts";
import {modals} from "@mantine/modals";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";

type Props = {
    section: Section;
    studyPlanId: number;
};

export function EditSectionDetailsModal({section, studyPlanId}: Props) {
    const form = useAppForm(sectionDetailsSchema, {
        ...section,
        name: section.name ?? ''
    });

    const editSectionDetails = useEditSectionDetails();

    const onSubmit = form.handleSubmit(data => {
        editSectionDetails.mutate({
            sectionDetails: data,
            sectionId: section.id,
            studyPlanId: studyPlanId
        }, {
            onSuccess: () => modals.closeAll()
        });
    });

    return (
        <form onSubmit={onSubmit}>
            <Flex gap="md" direction="column">
                <LoadingOverlay visible={editSectionDetails.isPending} zIndex={1000}
                                overlayProps={{radius: "sm", blur: 2}}/>

                <SectionDetailsFormFields form={form}/>

                <Button type="submit" fullWidth mt="md">Save Changes</Button>
            </Flex>
        </form>
    );
}

import {useForm} from "react-hook-form";
import {SectionDetailsFormValues, sectionDetailsSchema} from "@/features/study-plan/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Flex, LoadingOverlay, Button} from "@mantine/core";
import {SectionDetailsFormFields} from "@/features/study-plan/components/SectionDetailsFormFields.tsx";
import {Section} from "@/features/study-plan/types.ts";
import {useEditSectionDetails} from "@/features/study-plan/hooks/useEditSectionDetails.ts";
import {modals} from "@mantine/modals";

export function EditSectionDetailsModal({section, studyPlanId}: { section: Section, studyPlanId: number }) {

    const {handleSubmit, control, getValues, formState: {errors}} = useForm<SectionDetailsFormValues>({
        resolver: zodResolver(sectionDetailsSchema),
        defaultValues: {...section}
    });

    const editSectionDetails = useEditSectionDetails();

    const onSubmit = (data: SectionDetailsFormValues) => {
        editSectionDetails.mutate({
            updatedSectionDetails: data,
            sectionId: section.id,
            studyPlanId: studyPlanId
        }, {
            onSuccess: () => modals.closeAll()
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex gap="md" direction="column">
                <LoadingOverlay visible={editSectionDetails.isPending} zIndex={1000}
                                overlayProps={{radius: "sm", blur: 2}}/>

                <SectionDetailsFormFields control={control} errors={errors} getValues={getValues}/>

                <Button type="submit" fullWidth mt="md">Save Changes</Button>
            </Flex>
        </form>
    );
}
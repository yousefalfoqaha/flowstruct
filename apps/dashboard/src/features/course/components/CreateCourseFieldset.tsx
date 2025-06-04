import {AppCard} from "@/shared/components/AppCard.tsx";
import {CourseDetailsFormFields} from "@/features/course/components/CourseDetailsFormFields.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {courseDetailsSchema} from "@/features/course/schemas.ts";
import {getCoursePresetSettings} from "@/utils/getCoursePresetSettings.ts";
import {useCreateCourse} from "@/features/course/hooks/useCreateCourse.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {Button} from "@mantine/core";
import {Plus, X} from "lucide-react";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";
import {useCoursePreset} from "@/features/course/hooks/useCoursePreset.ts";

export function CreateCourseFieldset() {
    const form = useAppForm(courseDetailsSchema, {
            code: '',
            name: '',
            isRemedial: false,
            ...getCoursePresetSettings("lecture")
        }
    );
    const {preset, changePreset} = useCoursePreset(form);
    const createCourse = useCreateCourse();
    const navigate = useNavigate();

    const onSubmit = form.handleSubmit(data => {
        createCourse.mutate(data, {
            onSuccess: () => {
                navigate({
                    to: '/courses',
                    search: getDefaultSearchValues()
                });
                form.reset();
            }
        });
    });

    const footer = (
        <>
            <Link to="/courses" search={getDefaultSearchValues()}>
                <Button
                    variant="default"
                    leftSection={<X size={18}/>}
                >
                    Cancel
                </Button>
            </Link>

            <Button
                leftSection={<Plus size={18}/>}
                loading={createCourse.isPending}
                type="submit"
            >
                Save Course
            </Button>
        </>
    );

    return (
        <form onSubmit={onSubmit}>
            <AppCard
                title="Course Details"
                subtitle="Enter the details for the new course"
                footer={footer}
            >
                <CourseDetailsFormFields
                    form={form}
                    preset={preset}
                    changePreset={changePreset}
                />
            </AppCard>
        </form>
    );
}

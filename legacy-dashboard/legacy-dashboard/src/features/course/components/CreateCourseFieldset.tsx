import {AppCard} from "@/shared/components/AppCard.tsx";
import {CourseDetailsFormFields} from "@/features/course/components/CourseDetailsFormFields.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {courseDetailsSchema} from "@/features/course/schemas.ts";
import {getCoursePresetSettings, PresetType} from "@/lib/getCoursePresetSettings.ts";
import {useCreateCourse} from "@/features/course/hooks/useCreateCourse.ts";
import React from "react";
import {Course} from "@/features/course/types.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {Button} from "@mantine/core";
import {Plus, X} from "lucide-react";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";

export function CreateCourseFieldset() {
    const [preset, setPreset] = React.useState<PresetType>("lecture");
    const form = useAppForm(courseDetailsSchema, {
            code: '',
            name: '',
            isRemedial: false,
            ...getCoursePresetSettings(preset)
        }
    );

    const createCourse = useCreateCourse();
    const navigate = useNavigate();

    const changePreset = (value: string) => {
        setPreset(value as PresetType);

        form.reset((prevValues) => ({
            ...prevValues,
            ...getCoursePresetSettings(value as PresetType)
        }));
    };

    React.useEffect(() => {
        const subscription = form.watch((_, {name, type}) => {
            if (type !== 'change') return;

            const presetFields: (keyof Pick<Course, "creditHours" | "lectureHours" | "practicalHours" | "type">)[] = [
                "creditHours",
                "lectureHours",
                "practicalHours",
                "type"
            ];

            const presetFieldsModified = presetFields.includes(name);
            if (presetFieldsModified) setPreset("custom");
        });
        return () => subscription.unsubscribe();
    }, [form, form.watch]);

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

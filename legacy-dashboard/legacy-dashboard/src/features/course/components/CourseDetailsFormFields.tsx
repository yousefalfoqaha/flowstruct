import {Checkbox, Group, NumberInput, Radio, SegmentedControl, Text, Stack, TextInput, Center} from "@mantine/core";
import {Control, Controller, DeepRequired, FieldErrorsImpl} from "react-hook-form";
import {CourseType} from "@/features/course/types.ts";
import {BookOpenText, Earth, FlaskConical, GraduationCap, Hash, Settings2, Timer} from "lucide-react";
import {CourseDetailsFormValues} from "@/features/course/form-schemas.ts";
import {PresetType} from "@/lib/getCoursePresetSettings.ts";

type CourseDetailsFormFieldsProps = {
    control: Control<CourseDetailsFormValues>;
    errors: Partial<FieldErrorsImpl<DeepRequired<CourseDetailsFormValues>>>;
    preset: PresetType;
    changePreset: (value: string) => void;
}

export function CourseDetailsFormFields({control, errors, preset, changePreset}: CourseDetailsFormFieldsProps) {
    return (
        <Stack gap="md">
            <Group preventGrowOverflow={false} wrap="nowrap">
                <Controller
                    name="code"
                    control={control}
                    render={({field}) => (
                        <TextInput
                            w={130}
                            label="Code"
                            leftSection={<Hash size={18}/>}
                            {...field}
                            error={errors.code?.message}
                            autoComplete="off"
                            withAsterisk
                        />
                    )}
                />

                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <TextInput
                            flex={1}
                            label="Name"
                            {...field}
                            error={errors.name?.message}
                            autoComplete="off"
                            withAsterisk
                        />
                    )}
                />
            </Group>

            <div>
                <Text size="sm" fw={500} mb={3}>
                    Presets
                </Text>
                <Text>

                </Text>
                <SegmentedControl
                    value={preset}
                    onChange={changePreset}
                    withItemsBorders={false}
                    fullWidth
                    data={[
                        {
                            value: 'lecture',
                            label: (
                                <Center style={{gap: 10}}>
                                    <BookOpenText size={16}/>
                                    <span>Lecture</span>
                                </Center>
                            )
                        },
                        {
                            value: 'lab',
                            label: (
                                <Center style={{gap: 10}}>
                                    <FlaskConical size={16}/>
                                    <span>Lab</span>
                                </Center>
                            )
                        },
                        {
                            value: 'custom',
                            label: (
                                <Center style={{gap: 10}}>
                                    <Settings2 size={16}/>
                                    <span>Custom</span>
                                </Center>
                            )
                        }
                    ]}
                />
            </div>

            <Group preventGrowOverflow={false} wrap="nowrap">
                <Controller
                    name="creditHours"
                    control={control}
                    render={({field}) => (
                        <NumberInput
                            label="Credit Hours"
                            {...field}
                            error={errors.creditHours?.message}
                            autoComplete="off"
                            leftSection={<GraduationCap size={18}/>}
                            withAsterisk
                            allowNegative={false}
                            suffix=" Cr."
                        />
                    )}
                />

                <Controller
                    name="ects"
                    control={control}
                    render={({field}) => (
                        <NumberInput
                            label="ECTS"
                            {...field}
                            error={errors.ects?.message}
                            autoComplete="off"
                            leftSection={<Earth size={18}/>}
                            allowNegative={false}
                            suffix=" ECTS"
                        />
                    )}
                />
            </Group>


            <Group preventGrowOverflow={false} wrap="nowrap">
                <Controller
                    name="lectureHours"
                    control={control}
                    render={({field}) => (
                        <NumberInput
                            label="Lecture Hours"
                            {...field}
                            error={errors.lectureHours?.message}
                            autoComplete="off"
                            withAsterisk
                            leftSection={<Timer size={18}/>}
                            allowNegative={false}
                            suffix=" Hrs/Week"
                        />
                    )}
                />

                <Controller
                    name="practicalHours"
                    control={control}
                    render={({field}) => (
                        <NumberInput
                            label="Practical Hours"
                            {...field}
                            error={errors.practicalHours?.message}
                            autoComplete="off"
                            withAsterisk
                            leftSection={<Timer size={18}/>}
                            allowNegative={false}
                            suffix=" Hrs/Week"
                        />
                    )}
                />
            </Group>


            <Controller
                name="type"
                control={control}
                render={({field}) => (
                    <Radio.Group
                        {...field}
                        label="Teaching Method"
                        withAsterisk
                        error={errors.type?.message}
                    >
                        <Group mt="xs">
                            {Object.entries(CourseType).map(([key, value]) => (
                                <Radio value={key} label={`${key}: ${value}`}/>
                            ))}
                        </Group>
                    </Radio.Group>
                )}
            />

            <Controller
                name="isRemedial"
                control={control}
                render={({field}) => (
                    <Checkbox
                        mt="xs"
                        {...field}
                        defaultChecked={false}
                            label="Remedial Course"
                    />
                )}
            />
        </Stack>
    );
}

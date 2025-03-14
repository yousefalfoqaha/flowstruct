import {Checkbox, Group, NumberInput, Select, Stack, TextInput} from "@mantine/core";
import {Controller} from "react-hook-form";
import {CourseType} from "@/features/course/types.ts";

export function CourseDetailsFormFields({control, errors}: { control: any, errors: any }) {
    return (
        <Stack gap="md">
            <Group preventGrowOverflow={false} wrap="nowrap">
                <Controller
                    name="code"
                    control={control}
                    render={({field}) => (
                        <TextInput
                            w={120}
                            label="Code"
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
                            allowNegative={false}
                            suffix=" Hrs/Week"
                        />
                    )}
                />
            </Group>

            <Group preventGrowOverflow={false} wrap="nowrap" align="flex-end">
                <Controller
                    name="type"
                    control={control}
                    render={({field}) => (
                        <Select
                            flex={1}
                            label="Type"
                            placeholder="Select a course type"
                            {...field}
                            data={Object.entries(CourseType).map(([key, value]) => ({
                                value: key,
                                label: `${key}: ${value}`,
                            }))}
                            error={errors.degree?.message}
                            withAsterisk
                        />
                    )}
                />

                <Controller
                    name="isRemedial"
                    control={control}
                    render={({field}) => (
                        <Checkbox
                            mb={8}
                            {...field}
                            defaultChecked={false}
                            label="Remedial Course"
                        />
                    )}
                />
            </Group>
        </Stack>
    );
}

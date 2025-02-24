import {Controller} from "react-hook-form";
import {NumberInput, Stack, TextInput} from "@mantine/core";
import {Calendar, Timer} from "lucide-react";
import {YearPickerInput} from "@mantine/dates";

export function StudyPlanDetailsFormFields({control, errors}: { control: any, errors: any }) {

    return (
        <Stack gap="md">
            <Controller
                name="year"
                control={control}
                render={({field}) => (
                    <YearPickerInput
                        label="Year"
                        placeholder={new Date().getFullYear().toString()}
                        {...field}
                        error={errors.year?.message}
                        leftSection={<Calendar size={18}/>}
                        withAsterisk
                    />
                )}
            />

            <Controller
                name="duration"
                control={control}
                render={({field}) => (
                    <NumberInput
                        label="Duration"
                        description="Study plan duration in years"
                        autoComplete="off"
                        allowNegative={false}
                        {...field}
                        error={errors.duration?.message}
                        leftSection={<Timer size={18}/>}
                        withAsterisk
                    />
                )}
            />

            <Controller
                name="track"
                control={control}
                render={({field}) => (
                    <TextInput
                        label="Track Name"
                        placeholder='Eg. "General Track"'
                        autoComplete="off"
                        {...field}
                        error={errors.track?.message}
                    />
                )}
            />
        </Stack>
    );
}
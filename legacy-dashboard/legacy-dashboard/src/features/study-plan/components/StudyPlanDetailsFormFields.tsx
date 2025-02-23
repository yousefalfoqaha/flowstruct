import {Controller} from "react-hook-form";
import {Button, NumberInput, Stack, TextInput} from "@mantine/core";

export function StudyPlanDetailsFormFields({control, errors}: {control: any, errors: any}) {

    return (
        <Stack gap="md">
            <Controller
                name="year"
                control={control}
                render={({field}) => (
                    <NumberInput
                        label="Year"
                        placeholder={new Date().getFullYear().toString()}
                        allowNegative={false}
                        autoComplete="off"
                        {...field}
                        error={errors.year?.message}
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
                        withAsterisk
                    />
                )}
            />

            <Controller
                name="track"
                control={control}
                render={({field}) => (
                    <TextInput
                        label="Track"
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
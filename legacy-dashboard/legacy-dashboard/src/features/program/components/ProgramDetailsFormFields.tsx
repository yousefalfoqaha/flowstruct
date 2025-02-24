import {Controller} from "react-hook-form";
import {Select, Stack, TextInput} from "@mantine/core";
import {Degree} from "@/features/program/types.ts";
import {GraduationCap, Hash} from "lucide-react";

export function ProgramDetailsFormFields({control, errors}: { control: any, errors: any }) {
    return (
        <Stack gap="md">
            <Controller
                name="name"
                control={control}
                render={({field}) => (
                    <TextInput
                        label="Name"
                        {...field}
                        error={errors.name?.message}
                        autoComplete="off"
                        withAsterisk
                    />
                )}
            />

            <Controller
                name="code"
                control={control}
                render={({field}) => (
                    <TextInput
                        label="Code"
                        description='A unique identifier (MECH, CS, MGT, etc.)'
                        {...field}
                        leftSection={<Hash size={18} />}
                        error={errors.code?.message}
                        autoComplete="off"
                        withAsterisk
                    />
                )}
            />

            <Controller
                name="degree"
                control={control}
                render={({field}) => (
                    <Select
                        label="Degree"
                        placeholder="Select a degree"
                        {...field}
                        data={Object.entries(Degree).map(([key, value]) => ({
                            value: key,
                            label: value,
                        }))}
                        leftSection={<GraduationCap size={18} />}
                        error={errors.degree?.message}
                        withAsterisk
                    />
                )}
            />
        </Stack>
    );
}
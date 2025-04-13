import {Controller} from "react-hook-form";
import {Flex, Text, Select, Stack, Switch, TextInput} from "@mantine/core";
import {Degree} from "@/features/program/types.ts";
import {Eye, EyeOff, GraduationCap, Hash} from "lucide-react";

export function ProgramDetailsFormFields({control, errors}: { control: any, errors: any }) {
    return (
        <>
            <Flex gap="md">
                <Controller
                    name="code"
                    control={control}
                    render={({field}) => (
                        <TextInput
                            label="Code"
                            placeholder='eg., MECH, CS, MGT'
                            {...field}
                            leftSection={<Hash size={18}/>}
                            error={errors.code?.message}
                            autoComplete="off"
                            withAsterisk
                            w="50%"
                        />
                    )}
                />

                <Controller
                    name="name"
                    control={control}
                    render={({field}) => (
                        <TextInput
                            label="Name"
                            {...field}
                            placeholder="eg., Computer Science"
                            error={errors.name?.message}
                            autoComplete="off"
                            withAsterisk
                            w="50%"
                        />
                    )}
                />
            </Flex>
            <Flex gap="md" mt="md">
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
                            leftSection={<GraduationCap size={18}/>}
                            error={errors.degree?.message}
                            withAsterisk
                            w="50%"
                        />
                    )}
                />

                <Controller
                    name="isPrivate"
                    control={control}
                    render={({field: {onChange, value, ...rest}}) => (
                        <Stack gap={5} mt={6}>
                            <Text fw={600} size="sm">Visibility</Text>
                            <Switch
                                {...rest}
                                checked={!value}
                                onChange={(event) => onChange(!event.currentTarget.checked)}
                                description={!value ? 'Program is visible to students' : 'Program is hidden'}
                                onLabel={<Eye size={16}/>}
                                offLabel={<EyeOff size={16}/>}
                                size="md"
                            />
                        </Stack>
                    )}
                />
            </Flex>
        </>
    );
}
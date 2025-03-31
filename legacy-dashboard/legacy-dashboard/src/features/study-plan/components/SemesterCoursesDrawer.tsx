import {Combobox, Drawer, ScrollArea, TextInput} from "@mantine/core";
import React from "react";

type SemesterCoursesDrawerProps = {
    semester: number | null;
    onClose: () => void;

}

export function SemesterCoursesDrawer({semester, onClose}: SemesterCoursesDrawerProps) {
    const [value, setValue] = React.useState();



    return (
        <Drawer
            position="right"
            offset={8}
            radius="md"
            opened={!!semester}
            onClose={onClose}
            title={`Add Courses to Semester ${semester}`}
        >
            <Combobox>
                <Combobox.EventsTarget>
                    <TextInput
                        placeholder="Pick value"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                </Combobox.EventsTarget>

                <Combobox.Options mt="sm">
                    <ScrollArea h={350}>
                        <Combobox.Option value="First">First</Combobox.Option>
                        <Combobox.Option value="Second">Second</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                        <Combobox.Option value="Third">Third</Combobox.Option>
                    </ScrollArea>
                </Combobox.Options>
            </Combobox>
        </Drawer>
    );
}
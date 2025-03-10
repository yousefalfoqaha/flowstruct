import {
    Button,
    Checkbox,
    Combobox,
    Pill,
    PillsInput,
    Popover,
    ScrollArea,
    useCombobox,
    Flex
} from "@mantine/core";
import React from "react";
import {Plus, Link} from "lucide-react";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {useParams} from "@tanstack/react-router";
import {useDebouncedValue} from "@mantine/hooks";

export function PrerequisiteMultiSelect({parentCourse}: { parentCourse: number }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const {coursesGraph} = useCoursesGraph();
    const [opened, setOpened] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [debouncedSearch] = useDebouncedValue(search, 750);
    const [value, setValue] = React.useState<string[]>([]);
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: courses} = useCourseList(studyPlanId);

    const handleValueSelect = (val: string) =>
        setValue((current) =>
            current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
        );

    const handleValueRemove = (val: string) =>
        setValue((current) => current.filter((v) => v !== val));

    const values = value.map((id) => {
        const course = courses[Number(id)];
        return (
            <Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
                {course.code} {course.name}
            </Pill>
        );
    });

    const options = opened ? Array.from(coursesGraph, ([id]) => {
        const course = courses[id];
        const codeAndName = course.code + course.name;
        const isSelected = value.includes(id.toString());
        const createsCycle = coursesGraph.get(parentCourse)?.postrequisiteSequence.has(id);

        if (!course) return;

        return codeAndName.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
            ? <Combobox.Option disabled={createsCycle} value={id.toString()} key={id} active={isSelected}>
                <Flex align="center" gap="sm">
                    <Checkbox
                        checked={isSelected}
                        onChange={() => {
                        }}
                        aria-hidden
                        tabIndex={-1}
                        style={{pointerEvents: 'none'}}
                    />
                    <span>{course.code} {course.name}</span>
                </Flex>
            </Combobox.Option>
            : null;
    }).filter(Boolean) : [];

    return (
        <Popover
            position="left-start"
            shadow="md"
            opened={opened}
            onChange={setOpened}
            width={360}
            trapFocus
        >
            <Popover.Target>
                <Button
                    variant="subtle"
                    size="compact-xs"
                    leftSection={<Plus size={14}/>}
                    onClick={() => setOpened((o) => !o)}
                >
                    Add
                </Button>
            </Popover.Target>

            <Popover.Dropdown>
                <Flex direction="column" gap="sm">
                    {value.length > 0 && (
                        <Button leftSection={<Link size={14} />}>
                            Assign Prerequisites
                        </Button>
                    )}

                    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
                        <Combobox.DropdownTarget>
                            <PillsInput onClick={() => combobox.openDropdown()}>
                                <Pill.Group>
                                    {values}

                                    <Combobox.EventsTarget>
                                        <PillsInput.Field
                                            onFocus={() => combobox.openDropdown()}
                                            onBlur={() => combobox.closeDropdown()}
                                            value={search}
                                            placeholder="Search study plan courses"
                                            onChange={(event) => {
                                                combobox.updateSelectedOptionIndex();
                                                setSearch(event.currentTarget.value);
                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Backspace' && search.length === 0) {
                                                    event.preventDefault();
                                                    handleValueRemove(value[value.length - 1]);
                                                }
                                            }}
                                        />
                                    </Combobox.EventsTarget>
                                </Pill.Group>
                            </PillsInput>
                        </Combobox.DropdownTarget>

                        <Combobox.Dropdown>
                            <Combobox.Options>
                                <ScrollArea.Autosize mah={190} type="scroll" scrollbarSize={6}>
                                    {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
                                </ScrollArea.Autosize>
                            </Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                </Flex>
            </Popover.Dropdown>
        </Popover>
    );
}

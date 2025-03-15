import {
    Button,
    Checkbox,
    Combobox,
    Pill,
    PillsInput,
    Popover,
    ScrollArea,
    useCombobox,
    Flex, SegmentedControl, Group
} from "@mantine/core";
import React from "react";
import {Plus, Link} from "lucide-react";
import {useCoursesGraph} from "@/contexts/CoursesGraphContext.tsx";
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import {useParams} from "@tanstack/react-router";
import {useDebouncedValue} from "@mantine/hooks";
import {useAssignCoursePrerequisites} from "@/features/study-plan/hooks/useAssignCoursePrerequisites.ts";
import {CourseRelation} from "@/features/study-plan/types.ts";
import {useAssignCourseCorequisites} from "@/features/study-plan/hooks/useAssignCourseCorequisites.ts";
import {useStudyPlan} from "../hooks/useStudyPlan";

export function PrerequisiteMultiSelect({parentCourse}: { parentCourse: number }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex("active")
    });

    const [search, setSearch] = React.useState("");
    const [debouncedSearch] = useDebouncedValue(search, 400);
    const [value, setValue] = React.useState<Set<string>>(new Set());
    const [requisiteType, setRequisiteType] = React.useState<'PRE' | 'CO'>('PRE');

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: courses} = useCourseList(studyPlanId);

    const {coursesGraph} = useCoursesGraph();

    const assignPrerequisites = useAssignCoursePrerequisites();
    const assignCorequisites = useAssignCourseCorequisites();

    const handleValueSelect = (val: string) => {
        setValue((current) =>
            new Set(current.has(val) ? [...current].filter((v) => v !== val) : [...current, val])
        );
    };

    const handleValueRemove = (val: string) => {
        setValue((current) => {
            const newSet = new Set(current);
            newSet.delete(val);
            return newSet;
        });
    };

    const handleAssignCourses = () => {
        if (requisiteType === "PRE") {
            assignPrerequisites.mutate(
                {
                    courseId: parentCourse,
                    studyPlanId: studyPlanId,
                    prerequisites: Array.from(value).map(id => ({
                        prerequisite: parseInt(id),
                        relation: CourseRelation.AND
                    }))
                },
                {
                    onSuccess: () => {
                        combobox.closeDropdown();
                        setValue(new Set());
                        setSearch("");
                    }
                }
            )
            return;
        }

        assignCorequisites.mutate(
            {
                courseId: parentCourse,
                studyPlanId: studyPlanId,
                corequisites: Array.from(value).map(id => parseInt(id))
            },
            {
                onSuccess: () => {
                    combobox.closeDropdown();
                    setValue(new Set());
                    setSearch("");
                    setRequisiteType("PRE");
                }
            }
        )
    }

    const values = Array.from(value).map((id) => {
        const course = courses[Number(id)];
        return (
            <Pill key={id} withRemoveButton onRemove={() => handleValueRemove(id)}>
                {course.code}: {course.name}
            </Pill>
        );
    });

    const options = Array.from(coursesGraph, ([id]) => {
        const course = courses[id];
        if (!course) return null;

        const codeAndName = course.code + " " + course.name;
        const isSelected = value.has(id.toString());
        const createsCycle = coursesGraph.get(parentCourse)?.postrequisiteSequence.has(id);
        const alreadyAdded = coursesGraph.get(parentCourse)?.prerequisiteSequence.has(id) || studyPlan.courseCorequisites[parentCourse]?.includes(id);

        return codeAndName.toLowerCase().includes(debouncedSearch.trim().toLowerCase()) ? (
            <Combobox.Option
                disabled={createsCycle || parentCourse === id || alreadyAdded}
                value={id.toString()}
                key={id}
                active={isSelected}
            >
                <Flex align="center" gap="sm">
                    <Checkbox
                        checked={isSelected || alreadyAdded}
                        onChange={() => {
                        }}
                        aria-hidden
                        tabIndex={-1}
                        style={{pointerEvents: "none"}}
                    />
                    {course.code}: {course.name}
                </Flex>
            </Combobox.Option>
        ) : null;
    }).filter(Boolean);

    return (
        <Popover position="left-start" shadow="md" width={360} trapFocus>
            <Popover.Target>
                <Button radius="xl" variant="subtle" size="compact-xs" leftSection={<Plus size={14}/>}>
                    Add
                </Button>
            </Popover.Target>

            <Popover.Dropdown>
                <Flex direction="column" gap="sm">
                    {value.size > 0 && (
                        <Group grow preventGrowOverflow={false} gap="xs" wrap="nowrap">
                            <SegmentedControl
                                color="blue"
                                value={requisiteType}
                                onChange={setRequisiteType}
                                size="xs"
                                data={[
                                    {label: 'PRE', value: 'PRE'},
                                    {label: 'CO', value: 'CO'},
                                ]}
                            />

                            <Button
                                leftSection={<Link size={14}/>}
                                loading={assignPrerequisites.isPending}
                                onClick={handleAssignCourses}
                            >
                                Assign {requisiteType === 'PRE' ? 'Prerequisites' : 'Corequisites'}
                            </Button>
                        </Group>
                    )}

                    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
                        <Combobox.DropdownTarget>
                            <PillsInput label="Selected Courses">
                                <Pill.Group>
                                    {values}
                                    <Combobox.EventsTarget>
                                        <PillsInput.Field
                                            value={search}
                                            placeholder="Search study plan courses"
                                            onChange={(event) => {
                                                const newVal = event.currentTarget.value;
                                                setSearch(newVal);
                                                if (newVal.trim() !== "") {
                                                    combobox.openDropdown();
                                                } else {
                                                    combobox.closeDropdown();
                                                }
                                            }}
                                            onFocus={() => {
                                                if (search.trim() !== "") {
                                                    combobox.openDropdown();
                                                }
                                            }}
                                            onBlur={() => combobox.closeDropdown()}
                                            autoComplete="off"
                                        />
                                    </Combobox.EventsTarget>
                                </Pill.Group>
                            </PillsInput>
                        </Combobox.DropdownTarget>

                        <Combobox.Dropdown>
                            <Combobox.Options>
                                <ScrollArea.Autosize mah={300} type="scroll" scrollbarSize={6}>
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

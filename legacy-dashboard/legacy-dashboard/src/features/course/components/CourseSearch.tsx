import {
    Combobox,
    useCombobox,
    Button,
    Loader,
    Flex,
    Text,
    ScrollArea,
    Checkbox,
    Pill,
    PillsInput,
    Select,
    Popover
} from "@mantine/core";
import React from "react";
import {Plus} from "lucide-react";
import {useDebouncedValue} from "@mantine/hooks";
import {Course} from "@/features/course/types.ts";
import {useAddCoursesToSection} from "@/features/study-plan/hooks/useAddCoursesToSection.ts";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {usePaginatedCourses} from "@/features/course/hooks/usePaginatedCourses.ts";

export function CourseSearch() {
    const [opened, setOpened] = React.useState(false);
    const [search, setSearch] = React.useState<string>("");
    const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);
    const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const [debouncedSearch] = useDebouncedValue(search, 750);

    const addCoursesToSection = useAddCoursesToSection();

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.focusSearchInput()
    });

    const {data, isFetching, isFetched, fetchNextPage, hasNextPage} = usePaginatedCourses(debouncedSearch);

    const handleCourseSelect = (courseString: string) => {
        const course: Course = JSON.parse(courseString);
        setSelectedCourses((current) =>
            current.some(c => c.id === course.id)
                ? current.filter(c => c.id !== course.id)
                : [...current, course]
        );
    };

    const handleCourseRemove = (courseId: number) =>
        setSelectedCourses((current) => current.filter((c) => c.id !== courseId));

    const handleAddCourses = () => {
        const sectionId = parseInt(selectedSection ?? "");
        if (!sectionId) return;

        addCoursesToSection.mutate(
            {
                addedCourses: selectedCourses,
                sectionId: sectionId,
                studyPlanId: studyPlanId
            },
            {
                onSuccess: () => {
                    combobox.closeDropdown();
                    setSelectedCourses([]);
                    setSearch("");
                    setOpened(false); // Close the popover on success
                }
            }
        );
    };

    const selectedOptions = selectedCourses.map((course) => (
        <Pill key={course.id} withRemoveButton onRemove={() => handleCourseRemove(course.id)}>
            {course.code} {course.name}
        </Pill>
    ));

    const options =
        data?.pages.flatMap(page =>
            page.content.map(course => {
                const alreadyAdded = studyPlan?.sections.some(s => course.id in s.courses);

                return (
                    <Combobox.Option
                        value={JSON.stringify(course)}
                        key={course.id}
                        disabled={alreadyAdded}
                    >
                        <Flex align="center" gap="sm">
                            <Checkbox
                                checked={selectedCourses.some(c => c.id === course.id) || alreadyAdded}
                                onChange={() => {
                                }}
                                aria-hidden
                                tabIndex={-1}
                                style={{pointerEvents: "none"}}
                            />
                            <span>
                                {course.code} {course.name}
                            </span>
                        </Flex>
                    </Combobox.Option>
                );
            })
        ) ?? [];

    return (
        <Popover
            position="left-start"
            shadow="md"
            opened={opened}
            onChange={setOpened}
            width={360}
        >
            <Popover.Target>
                <Button onClick={() => setOpened((o) => !o)} leftSection={<Plus size={18}/>}>
                    Add Courses
                </Button>
            </Popover.Target>

            <Popover.Dropdown>
                <Flex direction="column" gap="md">
                    <Select
                        label="Section"
                        placeholder="Select a section"
                        data={
                            studyPlan
                                ? studyPlan.sections.map((section) => ({
                                    value: section.id.toString(),
                                    label: `${section.level} ${section.type}${
                                        section.name ? " - " + section.name : ""
                                    }`
                                }))
                                : []
                        }
                        comboboxProps={{withinPortal: false}}
                        value={selectedSection}
                        onChange={setSelectedSection}
                    />

                    <Combobox
                        store={combobox}
                        onOptionSubmit={handleCourseSelect}
                        withinPortal={false}
                    >
                        <Combobox.Target>
                            <PillsInput
                                label="Selected Courses"
                                rightSection={isFetching ? <Loader size={14}/> : null}
                                onClick={() => combobox.openDropdown()}
                            >
                                <Pill.Group>
                                    {selectedOptions}
                                    <PillsInput.Field
                                        value={search}
                                        placeholder="Search courses"
                                        onChange={(event) => {
                                            combobox.updateSelectedOptionIndex();
                                            setSearch(event.currentTarget.value);
                                            if (!combobox.dropdownOpened) {
                                                combobox.openDropdown();
                                            }
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === "Backspace" && search.length === 0) {
                                                event.preventDefault();
                                                handleCourseRemove(selectedCourses[selectedCourses.length - 1]?.id);
                                            }
                                        }}
                                        autoComplete="off"
                                    />
                                </Pill.Group>
                            </PillsInput>
                        </Combobox.Target>

                        {debouncedSearch !== "" && isFetched && (
                            <Combobox.Dropdown>
                                <>
                                    <Combobox.Options>
                                        <ScrollArea.Autosize mah={190} type="scroll" scrollbarSize={6}>
                                            {options.length > 0 ? options :
                                                <Combobox.Empty>Nothing found</Combobox.Empty>}
                                        </ScrollArea.Autosize>
                                    </Combobox.Options>

                                    {options.length > 0 && (
                                        <Combobox.Footer>
                                            {hasNextPage ? (
                                                <Button
                                                    size="compact-sm"
                                                    fullWidth
                                                    variant="subtle"
                                                    onClick={() => fetchNextPage()}
                                                >
                                                    Load more ({data?.pages[0].totalCourses} results total)
                                                </Button>
                                            ) : (
                                                <Text size="sm" c="dimmed" ta="center">
                                                    {data?.pages[0].totalCourses} results
                                                </Text>
                                            )}
                                        </Combobox.Footer>
                                    )}
                                </>
                            </Combobox.Dropdown>
                        )}
                    </Combobox>

                    {selectedCourses.length > 0 && selectedSection && (
                        <Button
                            fullWidth
                            onClick={handleAddCourses}
                            disabled={addCoursesToSection.isPending}
                            leftSection={
                                addCoursesToSection.isPending ? <Loader size={14}/> : <Plus size={14}/>
                            }
                        >
                            Add To Study Plan
                        </Button>
                    )}
                </Flex>
            </Popover.Dropdown>
        </Popover>
    );
}
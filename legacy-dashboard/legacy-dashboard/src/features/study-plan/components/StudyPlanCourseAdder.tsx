import {
    Button,
    Checkbox,
    Combobox,
    Flex,
    FocusTrap,
    Loader,
    Pill,
    PillsInput,
    Popover,
    ScrollArea,
    Select,
    Text,
    useCombobox
} from "@mantine/core";
import React from "react";
import {Plus} from "lucide-react";
import {useDebouncedValue} from "@mantine/hooks";
import {Course} from "@/features/course/types.ts";
import {useAddCoursesToSection} from "@/features/study-plan/hooks/useAddCoursesToSection.ts";
import {CreateCourseModal} from "@/features/course/components/CreateCourseModal.tsx";
import {getSectionCode} from "@/utils/getSectionCode.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {useInfiniteCourses} from "@/features/course/hooks/useInfiniteCourses.ts";

type StudyPlanCourseAdderProps = {
    studyPlan: StudyPlan;
}

export function StudyPlanCourseAdder({studyPlan}: StudyPlanCourseAdderProps) {
    const [popoverOpened, setPopoverOpened] = React.useState(false);
    const [selectedSection, setSelectedSection] = React.useState<string | null>(null);
    const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [debouncedSearch] = useDebouncedValue(search, 750);
    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.focusSearchInput()
    });

    const {data, isFetching, isFetched, fetchNextPage, hasNextPage} = useInfiniteCourses(debouncedSearch);

    const addCoursesToSection = useAddCoursesToSection();

    const handleCourseSelect = (courseString: string) => {
        const course: Course = JSON.parse(courseString);

        setSelectedCourses((current) =>
            current.some(c => c.id === course.id)
                ? current.filter(c => c.id !== course.id)
                : [...current, course]
        );
        setSearch("");
        combobox.closeDropdown();
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
                studyPlanId: studyPlan.id
            },
            {
                onSuccess: () => {
                    combobox.closeDropdown();
                    setSelectedCourses([]);
                    setSearch("");
                    setPopoverOpened(false);
                }
            }
        );
    };

    const sectionOptions = React.useMemo(() =>
        studyPlan?.sections.map((section) => ({
            value: section.id.toString(),
            label: `${getSectionCode(section)}: ${section.level} ${section.type} ${section.name
                ? `- ${section.name}`
                : (getSectionCode(section).split('.').length > 2 ? "- General" : "")}`
        })), [studyPlan]
    );

    const options =
        data?.pages.flatMap(page =>
            page.content.map(course => {
                const isAlreadyAdded = studyPlan?.sections.some(s => s.courses.includes(course.id));
                const isSelected = selectedCourses.some(c => c.id === course.id);

                return (
                    <Combobox.Option
                        value={JSON.stringify(course)}
                        key={course.id}
                        disabled={isAlreadyAdded}
                    >
                        <Flex align="center" gap="sm">
                            <Checkbox
                                checked={isSelected || isAlreadyAdded}
                                onChange={() => {
                                }}
                                aria-hidden
                                tabIndex={-1}
                                style={{pointerEvents: "none"}}
                            />
                            <span>
                                {course.code}: {course.name}
                            </span>
                        </Flex>
                    </Combobox.Option>
                );
            })
        ) ?? [];

    const selectedOptions = React.useMemo(() =>
        selectedCourses.map((course) => (
            <Pill key={course.id} withRemoveButton onRemove={() => handleCourseRemove(course.id)}>
                {course.code}: {course.name}
            </Pill>
        )), [selectedCourses]
    );

    return (
        <>
            <CreateCourseModal
                opened={createModalOpen}
                setOpened={setCreateModalOpen}
                openCourseSearch={() => {
                    setSearch('');
                    combobox.closeDropdown();
                    setPopoverOpened(true);
                }}
                selectCreatedCourse={(newCourse) =>
                    setSelectedCourses((current) => [...current, newCourse])
                }
            />

            <Popover
                position="left-start"
                shadow="md"
                opened={popoverOpened}
                onChange={setPopoverOpened}
                width={360}
            >
                <Popover.Target>
                    <Button
                        onClick={() => setPopoverOpened((o) => !o)}
                        leftSection={<Plus size={18}/>}
                    >
                        Add Courses
                    </Button>
                </Popover.Target>

                <Popover.Dropdown>
                    <Flex direction="column" gap="sm">
                        <Button
                            leftSection={<Plus size={14}/>}
                            onClick={handleAddCourses}
                            loading={addCoursesToSection.isPending}
                            disabled={selectedCourses.length <= 0 || !selectedSection}
                        >
                            Add To Study Plan
                        </Button>

                        <Select
                            label="Section"
                            withAsterisk
                            placeholder="Select a section"
                            data={sectionOptions ?? []}
                            comboboxProps={{withinPortal: false}}
                            value={selectedSection}
                            onChange={setSelectedSection}
                        />

                        <Combobox
                            store={combobox}
                            onOptionSubmit={handleCourseSelect}
                            withinPortal={false}
                        >
                            <FocusTrap active={popoverOpened}>
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
                                                placeholder="Search any course"
                                                onChange={(event) => {
                                                    combobox.updateSelectedOptionIndex();
                                                    setSearch(event.currentTarget.value);
                                                    if (!combobox.dropdownOpened) {
                                                        combobox.openDropdown();
                                                    }
                                                }}
                                                autoComplete="off"
                                            />
                                        </Pill.Group>
                                    </PillsInput>
                                </Combobox.Target>
                            </FocusTrap>

                            {debouncedSearch !== "" && isFetched && (
                                <Combobox.Dropdown>
                                    <>
                                        <Combobox.Header>
                                            {debouncedSearch.trim().length > 0 && (
                                                <Button
                                                    variant="transparent"
                                                    fullWidth
                                                    onClick={() => {
                                                        setPopoverOpened(false);
                                                        setCreateModalOpen(true);
                                                    }}
                                                    leftSection={<Plus size={14}/>}
                                                >
                                                    Create "{debouncedSearch}"
                                                </Button>
                                            )}
                                        </Combobox.Header>

                                        <Combobox.Options>
                                            <ScrollArea.Autosize mah={250} type="scroll" scrollbarSize={6}>
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
                    </Flex>
                </Popover.Dropdown>
            </Popover>
        </>
    );
}

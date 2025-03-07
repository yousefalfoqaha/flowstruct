import {
    ActionIcon,
    Combobox,
    useCombobox,
    Button,
    Loader,
    Flex,
    Text,
    ScrollArea,
    Checkbox,
    Pill,
    PillsInput
} from "@mantine/core";
import {Section} from "@/features/study-plan/types.ts";
import React from "react";
import {Plus} from "lucide-react";
import {useDebouncedValue} from "@mantine/hooks";
import {Course} from "@/features/course/types.ts";
import {useAddCoursesToSection} from "@/features/study-plan/hooks/useAddCoursesToSection.ts";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {usePaginatedCourses} from "@/features/course/hooks/usePaginatedCourses.ts";

export function CourseSearch({section}: { section: Section }) {
    const [search, setSearch] = React.useState<string>('');
    const [selectedCourses, setSelectedCourses] = React.useState<Course[]>([]);
    const [debouncedSearch] = useDebouncedValue(search, 750);

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    const {data: studyPlan} = useStudyPlan(studyPlanId);
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
        addCoursesToSection.mutate({
            addedCourses: selectedCourses,
            sectionId: section.id,
            studyPlanId: studyPlanId
        }, {
            onSuccess: () => {
                combobox.closeDropdown();
                setSelectedCourses([]);
                setSearch('');
            }
        });
    };

    const selectedOptions = selectedCourses.map((course) => (
        <Pill key={course.id} withRemoveButton onRemove={() => handleCourseRemove(course.id)}>
            {course.code} {course.name}
        </Pill>
    ));

    const options = data?.pages.flatMap(page =>
        page.content.map(course => {
            const alreadyAdded = studyPlan.sections.some(s => s.courses.includes(course.id));

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
                            style={{pointerEvents: 'none'}}
                        />
                        <span>{course.code} {course.name}</span>
                    </Flex>
                </Combobox.Option>
            );
        })
    ) ?? [];

    return (
        <Combobox
            store={combobox}
            width={360}
            onOptionSubmit={handleCourseSelect}
            shadow="sm"
            position="left-start"
            offset={{crossAxis: -8, mainAxis: 10}}
            withArrow
            arrowOffset={18}
        >
            <Combobox.Target>
                <ActionIcon onClick={() => combobox.toggleDropdown()}>
                    <Plus size={24}/>
                </ActionIcon>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Flex direction="column" gap={4}>
                    <PillsInput
                        rightSection={isFetching ? <Loader size={14}/> : null} onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            {selectedOptions}
                            <PillsInput.Field
                                value={search}
                                placeholder="Search courses to add..."
                                onChange={(event) => {
                                    combobox.updateSelectedOptionIndex();
                                    setSearch(event.currentTarget.value);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Backspace' && search.length === 0) {
                                        event.preventDefault();
                                        handleCourseRemove(selectedCourses[selectedCourses.length - 1]?.id);
                                    }
                                }}
                                autoComplete="off"
                            />
                        </Pill.Group>
                    </PillsInput>

                    {selectedCourses.length > 0 && (
                        <Combobox.Header>
                            <Button
                                fullWidth
                                onClick={() => handleAddCourses()}
                                disabled={addCoursesToSection.isPending}
                                leftSection={addCoursesToSection.isPending ? <Loader size={14}/> : <Plus size={14}/>}
                            >
                                Add To Section
                            </Button>
                        </Combobox.Header>
                    )}
                </Flex>

                {debouncedSearch !== '' && isFetched && (
                    <>
                        <Combobox.Options>
                            <ScrollArea.Autosize mah={180} type="scroll" scrollbarSize={6}>
                                {options.length > 0
                                    ? options
                                    : <Combobox.Empty>Nothing found</Combobox.Empty>
                                }
                            </ScrollArea.Autosize>
                        </Combobox.Options>

                        {options.length > 0 && (
                            <Combobox.Footer>
                                {hasNextPage
                                    ? (
                                        <Button
                                            size="compact-sm"
                                            fullWidth
                                            variant="subtle"
                                            onClick={() => fetchNextPage()}>
                                            Load more ({data?.pages[0].totalCourses} results total)
                                        </Button>
                                    )
                                    : <Text size="sm" c="dimmed"
                                            ta="center">{data?.pages[0].totalCourses} results</Text>
                                }
                            </Combobox.Footer>
                        )}
                    </>
                )}
            </Combobox.Dropdown>
        </Combobox>
    );
}

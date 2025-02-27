import {
    ActionIcon,
    Combobox,
    useCombobox,
    Button,
    Loader,
    Flex,
    ScrollArea,
    Checkbox,
    Pill,
    PillsInput
} from "@mantine/core";
import {Section} from "@/features/study-plan/types.ts";
import React from "react";
import {Plus} from "lucide-react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchPaginatedCoursesBySearch} from "@/features/course/api.ts";
import {useDebouncedValue} from "@mantine/hooks";
import {CourseSummary} from "@/features/course/types.ts";

export function CourseSearch({section}: { section: Section }) {
    const [search, setSearch] = React.useState<string>('');
    const [selectedCourses, setSelectedCourses] = React.useState<CourseSummary[]>([]);
    const [debouncedSearch] = useDebouncedValue(search, 750);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.focusSearchInput()
    });

    const {data, isFetching, isFetched, fetchNextPage, hasNextPage} = useInfiniteQuery({
        queryKey: ["course", "page", debouncedSearch],
        queryFn: ({pageParam = 0}) => fetchPaginatedCoursesBySearch(debouncedSearch, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.isLastPage ? undefined : lastPage.page + 1,
        enabled: debouncedSearch !== ''
    });

    const handleCourseSelect = (courseString: string) => {
        const course: CourseSummary = JSON.parse(courseString);
        setSelectedCourses((current) =>
            current.some(c => c.id === course.id)
                ? current.filter(c => c.id !== course.id)
                : [...current, course]
        );
    };

    const handleCourseRemove = (courseId: number) =>
        setSelectedCourses((current) => current.filter((c) => c.id !== courseId));

    const selectedOptions = selectedCourses.map((course) => (
        <Pill key={course.id} withRemoveButton onRemove={() => handleCourseRemove(course.id)}>
            {course.code} {course.name}
        </Pill>
    ));

    const options = data?.pages.flatMap(page =>
        page.content.map(course => {
            return (
                <Combobox.Option value={JSON.stringify(course)} key={course.id}>
                    <Flex align="center" gap="sm">
                        <Checkbox
                            checked={selectedCourses.some(c => c.id === course.id)}
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
                    <PillsInput rightSection={isFetching ? <Loader size={14}/> : null}
                                onClick={() => combobox.openDropdown()}
                    >
                        <Pill.Group>
                            {selectedOptions}
                            <PillsInput.Field
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
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

                    {debouncedSearch !== '' && isFetched && (
                        <Combobox.Header>
                            {data?.pages[0].totalCourses} results
                        </Combobox.Header>
                    )}

                    {debouncedSearch !== '' && (
                        <Combobox.Options>
                            <ScrollArea.Autosize mah={180} type="scroll" scrollbarSize={6}>
                                {options.length > 0 && isFetched
                                    ? options
                                    : <Combobox.Empty>Nothing found</Combobox.Empty>
                                }
                            </ScrollArea.Autosize>
                        </Combobox.Options>
                    )}

                    {hasNextPage && (
                        <Combobox.Footer>
                            <Button fullWidth variant="subtle" onClick={() => fetchNextPage()}>
                                Load more...
                            </Button>
                        </Combobox.Footer>
                    )}
                </Flex>
            </Combobox.Dropdown>
        </Combobox>
    );
}

import {
    ActionIcon, Badge,
    Box, Button,
    Flex,
    Group,
    RenderTreeNodePayload,
    Stack,
    Text,
    Tree,
    TreeNodeData,
    useTree
} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {SectionLevel, SectionType} from "@/features/study-plan/types.ts";
import {ChevronDown, Filter} from "lucide-react";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {SectionMenu} from "@/features/study-plan/components/SectionMenu.tsx";
import classes from './SectionsTabs.module.css'
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";
import React from "react";

export function SectionsTabs({selectSection, selectedSection}: {
    selectSection: (sectionId: number | null) => void,
    selectedSection: number | null
}) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: courses} = useCourseList(studyPlanId);
    const tree = useTree({
        multiple: false
    });

    const data: TreeNodeData[] = React.useMemo(() => Object.values(SectionLevel)
        .map(level => {
            const children = Object.values(SectionType)
                .map(type => {
                    const sections = studyPlan.sections.filter(s => s.level === level && s.type === type);

                    if (sections.length === 0) return null;

                    return {
                        label: type.toString(),
                        value: `${level}_${type}`,
                        children: sections.map(section => ({
                            label: section.name || "Core Courses",
                            value: section.id.toString(),
                        }))
                    };
                })
                .filter(Boolean);

            return children.length > 0
                ? {label: level.toString(), value: level.toString(), children}
                : null;
        })
        .filter(Boolean), [studyPlan]);

    const Leaf = ({node, level, expanded, hasChildren, elementProps}: RenderTreeNodePayload) => {
        const section = studyPlan.sections.find(s => s.id.toString() === node.value);

        // const totalCreditHours = section?.courses.reduce((acc, courseId) => {
        //     const course = courses[courseId];
        //     return acc + (course ? course.creditHours : 0);
        // }, 0) ?? 0;

        const isSelected = parseInt(node.value) === selectedSection;

        const handleFilter = () => {
            if (level > 2 && !isSelected) {
                selectSection(Number(node.value));
                return;
            }
            selectSection(null);
        }

        return (
            <Box {...elementProps} w={250}>
                <Group gap={10} pr={hasChildren ? 'lg' : 10} py={5} pl={hasChildren ? 'sm' : 35}>
                    {hasChildren && (
                        <ChevronDown
                            size={14}
                            style={{transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
                        />
                    )}

                    <span style={{fontWeight: isSelected ? 600 : 'normal'}}>
                        {node.label}
                    </span>

                    {!hasChildren && (
                        <Group justify="space-between">
                            <Badge size="sm" variant="default">{section?.requiredCreditHours} Cr. Req</Badge>

                            <Group gap={5}>
                                <ActionIcon onClick={handleFilter} variant="transparent">
                                    <Filter size={14}/>
                                </ActionIcon>

                                <SectionMenu section={section}/>
                            </Group>
                        </Group>
                    )}
                </Group>
            </Box>
        );
    };

    return (
        <Flex direction="column" gap={8}>
            <Group style={{borderBottom: "1px solid #dee2e6"}} pb={10} justify="space-between">
                <Text fw={500}>Sections</Text>

                <Group>
                    {selectedSection && (
                        <Button onClick={() => selectSection(null)} size="compact-sm" p={0}
                                leftSection={<Filter size={14}/>} color="gray" variant="transparent">
                            Clear
                        </Button>
                    )}
                    <CreateSectionModal/>
                </Group>
            </Group>
            <Tree
                tree={tree}
                classNames={classes}
                data={data}
                selectOnClick={false}
                renderNode={(payload) => <Leaf {...payload} />}
            />
        </Flex>
    );
}

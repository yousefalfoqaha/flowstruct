import {Box, Button, Flex, Group, RenderTreeNodePayload, Stack, Text, Tree, TreeNodeData} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {SectionLevel, SectionType} from "@/features/study-plan/types.ts";
import {ChevronDown} from "lucide-react";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {SectionMenu} from "@/features/study-plan/components/SectionMenu.tsx";
import classes from './SectionsTabs.module.css'
import {useCourseList} from "@/features/course/hooks/useCourseList.ts";

export function SectionsTabs({selectSection}: { selectSection: (sectionId: number | undefined) => void }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: courses} = useCourseList(studyPlanId);


    const data: TreeNodeData[] = Object.values(SectionLevel)
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
        .filter(Boolean);

    const Leaf = ({node, expanded, hasChildren, elementProps}: RenderTreeNodePayload) => {
        const section = studyPlan.sections.find(s => s.id.toString() === node.value);

        const totalCreditHours = section?.courses.reduce((acc, courseId) => {
            const course = courses[courseId];
            return acc + (course ? course.creditHours : 0);
        }, 0) ?? 0;

        return (
            <Box {...elementProps}>
                <Stack gap={5}>
                    <Group gap={10} pr={hasChildren ? 'lg' : 10} py={5} pl={hasChildren ? 'sm' : 35}>
                        {hasChildren && (
                            <ChevronDown
                                size={14}
                                style={{transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
                            />
                        )}

                        <span>{node.label}</span>

                        {!hasChildren && (
                            <Text size="xs" c="dimmed">{totalCreditHours} Cr.</Text>
                        )}

                        {!hasChildren && (
                            <SectionMenu section={section}/>
                        )}
                    </Group>
                </Stack>
            </Box>
        );
    };

    return (
        <Flex direction="column" gap={8}>
            <Group style={{borderBottom: "1px solid #dee2e6"}} pb={10} justify="space-between">
                <Text fw={500}>Sections</Text>
                <CreateSectionModal/>
            </Group>
            <Tree
                classNames={classes}
                styles={{
                    node: {radius: 10}
                }}
                data={data}
                selectOnClick
                renderNode={(payload) => <Leaf {...payload} />}
            />
        </Flex>
    );
}

import {
    ActionIcon, Badge,
    Box, Button,
    Flex,
    Group, Indicator,
    RenderTreeNodePayload,
    Text,
    Tree,
    TreeNodeData
} from "@mantine/core";
import {SectionLevel, SectionType, StudyPlan} from "@/features/study-plan/types.ts";
import {ChevronDown, Filter, List} from "lucide-react";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {SectionOptionsMenu} from "@/features/study-plan/components/SectionOptionsMenu.tsx";
import classes from './SectionsTabs.module.css';
import React from "react";
import {MoveSectionMenu} from "@/features/study-plan/components/MoveSectionMenu.tsx";
import {getSectionCode, getSectionLevelCode, getSectionTypeCode} from "@/lib/getSectionCode.ts";
import {useSelectedSection} from "@/features/study-plan/hooks/useSelectedSection.ts";
import {Table} from "@tanstack/react-table";
import {FrameworkCourse} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";

type SectionsTreeProps = {
    studyPlan: StudyPlan;
    table: Table<FrameworkCourse>;
}

export function SectionsTree({studyPlan, table}: SectionsTreeProps) {
    const {selectedSection, setSelectedSection} = useSelectedSection(table);

    const data: TreeNodeData[] = React.useMemo(() => {
        return Object.values(SectionLevel).flatMap(level => {
            const levelCode = getSectionLevelCode(level);

            const children = Object.values(SectionType).flatMap(type => {
                const siblingSections = studyPlan.sections.filter(s => s.level === level && s.type === type);
                const typeCode = getSectionTypeCode(type);

                if (siblingSections.length === 0) return [];

                if (siblingSections.length === 1) {
                    const section = siblingSections[0];
                    return [{
                        label: `${getSectionCode(section)}. ${type} ${section.name ? `- ${section.name}` : ''}`,
                        value: section.id.toString(),
                    }];
                }

                return [{
                    label: `${levelCode}.${typeCode}. ${type}`,
                    value: `${level}_${type}`,
                    children: siblingSections.map(section => ({
                        label: `${getSectionCode(section)}. ${section.name || "General"}`,
                        value: section.id.toString(),
                    })),
                }];
            });

            if (children.length === 0) return [];

            return [{
                label: `${levelCode}. ${level}`,
                value: level.toString(),
                children,
            }];
        });
    }, [studyPlan.sections]);

    const Leaf = ({node, level, expanded, hasChildren, elementProps}: RenderTreeNodePayload) => {
        const section = studyPlan.sections.find(s => s.id.toString() === node.value);

        const isSelected = Number(node.value) === selectedSection?.id;

        const handleFilter = () => {
            if (!isSelected) {
                setSelectedSection(Number(node.value));
                return;
            }
            setSelectedSection(null);
        }

        return (
            <Box {...elementProps} w={250}>
                <Group gap={10} py={5}>
                    {hasChildren && (
                        <ChevronDown
                            size={14}
                            style={{transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
                        />
                    )}

                    <Indicator position="middle-start" offset={-20} disabled={!isSelected}>
                        <span style={{
                            marginRight: 8,
                            fontWeight: isSelected ? 600 : 'normal'
                        }}>
                            {node.label}
                        </span>

                        {section && (
                            <Badge size="xs" variant="default">{section.requiredCreditHours} Cr. Req</Badge>
                        )}
                    </Indicator>
                </Group>

                {section && (
                    <Group gap={5}>
                        {level > 2 && <MoveSectionMenu studyPlan={studyPlan} section={section}/>}

                        <ActionIcon onClick={handleFilter} variant="transparent">
                            <Filter size={14}/>
                        </ActionIcon>

                        <SectionOptionsMenu
                            selectedSection={selectedSection}
                            resetSelectedSection={() => selectSection(null)}
                            section={section}
                            studyPlanId={studyPlan.id}
                        />
                    </Group>
                )}
            </Box>
        );
    };

    return (
        <Flex direction="column" gap={8}>
            <Group style={{borderBottom: "1px solid #dee2e6"}} pb={10} justify="space-between">
                <Group gap="sm">
                    <List size={18}/>
                    <Text fw={500}>Sections</Text>
                </Group>

                <Group>
                    {selectedSection && (
                        <Button onClick={() => selectSection(null)} size="compact-sm" p={0}
                                leftSection={<Filter size={14}/>} color="gray" variant="transparent">
                            Clear
                        </Button>
                    )}

                    <CreateSectionModal studyPlanId={studyPlan.id} />
                </Group>
            </Group>

            <Tree
                levelOffset="xl"
                classNames={classes}
                data={data}
                selectOnClick={false}
                renderNode={(payload) => <Leaf {...payload} />}
            />
        </Flex>
    );
}

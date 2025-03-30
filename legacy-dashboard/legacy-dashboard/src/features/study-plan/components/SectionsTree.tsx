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
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {SectionLevel, SectionType} from "@/features/study-plan/types.ts";
import {ChevronDown, Filter} from "lucide-react";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {SectionOptionsMenu} from "@/features/study-plan/components/SectionOptionsMenu.tsx";
import classes from './SectionsTabs.module.css';
import React from "react";
import {MoveSectionMenu} from "@/features/study-plan/components/MoveSectionMenu.tsx";
import {getSectionCode, getSectionLevelCode, getSectionTypeCode} from "@/lib/getSectionCode.ts";

export function SectionsTree({selectSection, selectedSection}: {
    selectSection: (sectionId: number | null) => void,
    selectedSection: number | null
}) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const data: TreeNodeData[] = React.useMemo(() => Object.values(SectionLevel)
        .map(level => {
            const levelCode = getSectionLevelCode(level);

            const children = Object.values(SectionType)
                .map(type => {
                    const sections = studyPlan.sections.filter(s => s.level === level && s.type === type);
                    const typeCode = getSectionTypeCode(type);

                    if (sections.length === 0) return null;

                    if (sections.length === 1) {
                        const section = sections[0];
                        return {
                            label: `${getSectionCode(section)}. ${type} ${section.name ? `- ${section.name}` : ''}`,
                            value: section.id.toString()
                        };
                    }

                    return {
                        label: `${levelCode}.${typeCode}. ${type}`,
                        value: `${level}_${type}`,
                        children: sections
                            .sort((a, b) => {
                                const codeA = getSectionCode(a);
                                const codeB = getSectionCode(b);
                                return codeA.localeCompare(codeB);
                            })
                            .map(section => ({
                                label: `${getSectionCode(section)}. ${section.name || "General"}`,
                                value: section.id.toString(),
                            }))
                    };
                })
                .filter(Boolean);

            return children.length > 0
                ? {label: `${levelCode}. ${level}`, value: level.toString(), children}
                : null;
        })
        .filter(Boolean), [studyPlan]);

    const Leaf = ({node, level, expanded, hasChildren, elementProps}: RenderTreeNodePayload) => {
        const section = studyPlan.sections.find(s => s.id.toString() === node.value);

        const isSelected = parseInt(node.value) === selectedSection;

        const handleFilter = () => {
            if (!isSelected) {
                selectSection(Number(node.value));
                return;
            }
            selectSection(null);
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

                        {!hasChildren && (
                            <Badge size="xs" variant="default">{section?.requiredCreditHours} Cr. Req</Badge>
                        )}
                    </Indicator>
                </Group>

                {!hasChildren && (
                    <Group gap={5}>
                        {level > 2 && <MoveSectionMenu section={section}/>}

                        <ActionIcon onClick={handleFilter} variant="transparent">
                            <Filter size={14}/>
                        </ActionIcon>

                        <SectionOptionsMenu
                            selectedSection={selectedSection}
                            resetSelectedSection={() => selectSection(null)}
                            section={section}
                        />
                    </Group>
                )}
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
                levelOffset="xl"
                classNames={classes}
                data={data}
                selectOnClick={false}
                renderNode={(payload) => <Leaf {...payload} />}
            />
        </Flex>
    );
}

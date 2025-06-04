import {
  Badge,
  Box,
  Flex,
  Group,
  RenderTreeNodePayload,
  Text,
  Tree,
  TreeNodeData,
} from '@mantine/core';
import { SectionLevel, SectionType, StudyPlan } from '@/features/study-plan/types.ts';
import { ChevronDown } from 'lucide-react';
import { CreateSectionModal } from '@/features/study-plan/components/CreateSectionModal.tsx';
import classes from './SectionsTree.module.css';
import React from 'react';
import { MoveSectionMenu } from '@/features/study-plan/components/MoveSectionMenu.tsx';
import { getSectionCode, getSectionLevelCode, getSectionTypeCode } from '@/utils/getSectionCode.ts';
import { SectionOptionsMenu } from '@/features/study-plan/components/SectionOptionsMenu.tsx';

type SectionsTreeProps = {
  studyPlan: StudyPlan;
};

export function SectionsTree({ studyPlan }: SectionsTreeProps) {
  const data: TreeNodeData[] = React.useMemo(() => {
    return Object.values(SectionLevel).flatMap((level) => {
      const levelCode = getSectionLevelCode(level);

      const children = Object.values(SectionType).flatMap((type) => {
        const siblingSections = studyPlan.sections.filter(
          (s) => s.level === level && s.type === type
        );
        const typeCode = getSectionTypeCode(type);

        if (siblingSections.length === 0) return [];

        if (siblingSections.length === 1) {
          const section = siblingSections[0];
          return [
            {
              label: `${getSectionCode(section)}. ${type} ${section.name ? `- ${section.name}` : ''}`,
              value: section.id.toString(),
            },
          ];
        }

        return [
          {
            label: `${levelCode}.${typeCode}. ${type}`,
            value: `${level}_${type}`,
            children: siblingSections.map((section) => ({
              label: `${getSectionCode(section)}. ${section.name || 'General'}`,
              value: section.id.toString(),
            })),
          },
        ];
      });

      if (children.length === 0) return [];

      return [
        {
          label: `${levelCode}. ${level}`,
          value: level.toString(),
          children,
        },
      ];
    });
  }, [studyPlan.sections]);

  const Leaf = ({ node, level, expanded, hasChildren, elementProps }: RenderTreeNodePayload) => {
    const section = studyPlan.sections.find((s) => s.id.toString() === node.value);

    return (
      <Box {...elementProps} w={250}>
        <Group gap={10} py={5}>
          {hasChildren && (
            <ChevronDown
              size={14}
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          )}

          <span>{node.label}</span>
        </Group>

        <Group gap="xs" justify="space-between">
          {section && (
            <Badge size="xs" variant="default">
              {section.requiredCreditHours} Cr. Req
            </Badge>
          )}

          <Group gap="xs">
            {level > 2 && section && <MoveSectionMenu studyPlan={studyPlan} section={section} />}

            {section && <SectionOptionsMenu section={section} studyPlanId={studyPlan.id} />}
          </Group>
        </Group>
      </Box>
    );
  };

  return (
    <Flex direction="column" gap={8}>
      <Group justify="space-between">
        <Text fw={500}>All Sections</Text>
        <CreateSectionModal studyPlanId={studyPlan.id} />
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

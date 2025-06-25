import {
  Badge,
  Box,
  Group,
  RenderTreeNodePayload,
  Stack,
  Text,
  Tree,
  TreeNodeData,
} from '@mantine/core';
import { SectionLevel, SectionType, StudyPlan } from '@/features/study-plan/types.ts';
import { ChevronDown, Folder, List } from 'lucide-react';
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
    const coursesCount = section?.courses.length || 0;

    return (
      <Box {...elementProps} py="xs">
        <Group style={{ flex: 1 }}>
          {hasChildren && (
            <ChevronDown
              size={14}
              style={{
                transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s ease',
                color: 'var(--mantine-color-gray-6)',
              }}
            />
          )}

          <Group gap="sm">
            {hasChildren ? <Folder size={16} color="gray" /> : <List size={16} color="gray" />}
            <Text style={{ flex: 1 }}>{node.label}</Text>
          </Group>
        </Group>

        <Group gap="xs" align="center">
          {section && (
            <>
              <Badge size="xs" variant="light" color="gray">
                {section.requiredCreditHours} Cr.
              </Badge>
              <Badge size="xs" variant="light" color="blue">
                {coursesCount} courses
              </Badge>
            </>
          )}

          {level > 2 && section && <MoveSectionMenu studyPlan={studyPlan} section={section} />}
          {section && <SectionOptionsMenu section={section} studyPlanId={studyPlan.id} />}
        </Group>
      </Box>
    );
  };

  return (
    <Stack gap="xs" w={300}>
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
    </Stack>
  );
}

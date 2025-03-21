import {ActionIcon, Badge, Box, Group, Stack, Tabs, Text} from "@mantine/core";
import {EllipsisVertical} from "lucide-react";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {getSectionCode} from "@/lib/getSectionCode.ts";

export function SectionsTabs() {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const sections = studyPlan.sections.sort((a, b) => {
        const codeA = getSectionCode(a);
        const codeB = getSectionCode(b);
        return codeA.localeCompare(codeB);
    });

    return (
        <Tabs defaultValue="0">
            <Tabs.List>
                <Tabs.Tab value="0">
                    All Sections
                </Tabs.Tab>

                {sections.map(section => (
                    <Tabs.Tab
                        value={section.id.toString()}
                        rightSection={
                            <ActionIcon
                                variant="default"
                                onClick={(event) => event.stopPropagation()}
                                styles={{
                                    root: {
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                    }
                                }}
                            >
                                <EllipsisVertical size={14}/>
                            </ActionIcon>
                        }
                    >
                        <Group gap="md">
                            <Badge variant="outline">{getSectionCode(section)}</Badge>
                            <Stack gap={5}>
                                {section.level} {section.type}
                                {section.name && <Text c="dimmed" size="xs">{section.name}</Text>}
                            </Stack>
                        </Group>
                    </Tabs.Tab>
                ))}

                <Box m="md">
                    <CreateSectionModal/>
                </Box>
            </Tabs.List>
        </Tabs>
    );
}
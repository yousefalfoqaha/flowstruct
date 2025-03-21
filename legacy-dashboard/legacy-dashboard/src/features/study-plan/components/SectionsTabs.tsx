import {Badge, Box, Group, Stack, Tabs, Text} from "@mantine/core";
import {CreateSectionModal} from "@/features/study-plan/components/CreateSectionModal.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {getSectionCode} from "@/lib/getSectionCode.ts";
import {SectionMenu} from "@/features/study-plan/components/SectionMenu.tsx";

export function SectionsTabs({selectSection}: { selectSection: (sectionId: number | null) => void }) {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const sections = studyPlan.sections.sort((a, b) => {
        const codeA = getSectionCode(a);
        const codeB = getSectionCode(b);
        return codeA.localeCompare(codeB);
    });

    return (
        <Tabs orientation="vertical" defaultValue="0" styles={{
            tabLabel: {flex: 1}
        }}>
            <Tabs.List grow>
                <Tabs.Tab value="0" onClick={() => selectSection(null)}>
                    <Stack gap={7} align="center">
                        <Text ta="center" fw={500}>All Sections</Text>
                        <Badge>134 total Credits</Badge>
                    </Stack>
                </Tabs.Tab>

                {sections.map(section => (
                    <Tabs.Tab value={section.id.toString()} onClick={() => selectSection(section.id)}>
                        <Group justify="space-between">
                            <Group>
                                <Badge variant="outline">{getSectionCode(section)}</Badge>
                                <Stack gap={5}>
                                    {section.level} {section.type}
                                    {section.name && <Text c="dimmed" size="xs">{section.name}</Text>}
                                </Stack>
                            </Group>

                            <SectionMenu section={section}/>
                        </Group>
                    </Tabs.Tab>
                ))}

                <Box mx="auto" w="max-content" mt="xs">
                    <CreateSectionModal/>
                </Box>
            </Tabs.List>
        </Tabs>
    );
}
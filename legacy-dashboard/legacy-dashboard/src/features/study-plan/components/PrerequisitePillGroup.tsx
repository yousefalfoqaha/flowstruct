import {Flex, Indicator, Loader, Pill} from "@mantine/core";
import {PrerequisiteMultiSelect} from "@/features/study-plan/components/PrerequisiteMultiSelect.tsx";
import {useUnlinkPrerequisite} from "@/features/study-plan/hooks/useUnlinkPrerequisite.ts";
import {useUnlinkCorequisite} from "@/features/study-plan/hooks/useUnlinkCorequisite.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useStudyPlanCourses} from "@/features/study-plan/hooks/useStudyPlanCourses.ts";

type PrerequisitePillGroupProps = {
    parentCourseId: number;
}

export function PrerequisitePillGroup({parentCourseId}: PrerequisitePillGroupProps) {
    const unlinkPrerequisite = useUnlinkPrerequisite();
    const unlinkCorequisite = useUnlinkCorequisite();

    const {data: studyPlan} = useStudyPlan();
    const {data: courses} = useStudyPlanCourses();

    const handleRemovePrerequisite = (prerequisiteId: number) => unlinkPrerequisite.mutate({
        studyPlanId: studyPlan.id,
        courseId: parentCourseId,
        prerequisiteId: prerequisiteId
    });

    const handleRemoveCorequisite = (corequisiteId: number) => unlinkCorequisite.mutate({
        studyPlanId: studyPlan.id,
        courseId: parentCourseId,
        corequisiteId: corequisiteId
    });

    const prerequisites = studyPlan.coursePrerequisites[parentCourseId] ?? {};
    const corequisites = studyPlan.courseCorequisites[parentCourseId] ?? [];

    return (
        <Flex align="center" w={250} wrap="wrap" gap={7}>
            {Object.keys(prerequisites).map((prerequisiteId) => {
                const prerequisite = courses[Number(prerequisiteId)];
                if (!prerequisite) return null;

                const isRemovingPrerequisite =
                    unlinkPrerequisite.isPending &&
                    unlinkPrerequisite.variables.prerequisiteId === prerequisite.id &&
                    unlinkPrerequisite.variables.courseId === parentCourseId;

                return (
                    <Pill
                        key={prerequisite.id}
                        withRemoveButton
                        disabled={isRemovingPrerequisite}
                        onRemove={() => handleRemovePrerequisite(prerequisite.id)}
                    >
                        {prerequisite.code}
                    </Pill>
                );
            })}

            {corequisites.map(corequisiteId => {
                const corequisite = courses[corequisiteId];
                if (!corequisite) return null;

                const isRemovingCorequisite =
                    unlinkCorequisite.isPending &&
                    unlinkCorequisite.variables.corequisiteId === corequisite.id &&
                    unlinkCorequisite.variables.courseId === parentCourseId;

                return (
                    <Indicator
                        key={corequisite.id}
                        size={14}
                        color="gray"
                        position="middle-start"
                        offset={18}
                        fw="bold"
                        zIndex={0}
                        inline
                        label="CO"
                    >
                        <Pill
                            onRemove={() => handleRemoveCorequisite(corequisiteId)}
                            fw="normal"
                            pl={35}
                            disabled={isRemovingCorequisite}
                            key={corequisite.id}
                            withRemoveButton
                        >
                            {corequisite.code}
                        </Pill>
                    </Indicator>
                )
            })}

            <PrerequisiteMultiSelect studyPlan={studyPlan} courses={courses} parentCourseId={parentCourseId}/>

            {
                unlinkPrerequisite.isPending && unlinkPrerequisite.variables.courseId === parentCourseId ||
                unlinkCorequisite.isPending && unlinkCorequisite.variables.courseId === parentCourseId
                    ? <Loader size={14}/>
                    : null
            }
        </Flex>
    );
}
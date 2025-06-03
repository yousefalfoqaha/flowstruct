import {Globe} from "lucide-react";
import {Button} from "@mantine/core";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {usePublishStudyPlan} from "@/features/study-plan/hooks/usePublishStudyPlan.ts";

type Props = {
    studyPlan: StudyPlan;
}

export function PublishButton({studyPlan}: Props) {
    const publishStudyPlan = usePublishStudyPlan();

    return (
        <Button
            leftSection={<Globe size={18}/>}
            radius="xl"
            variant="outline"
            mb="auto"
            ml="auto"
            onClick={() => publishStudyPlan.mutate(studyPlan.id)}
            loading={publishStudyPlan.isPending}
            disabled={studyPlan.isPublished}
        >
            {studyPlan.isPublished ? 'Published' : 'Publish Study Plan'}
        </Button>
    );
}
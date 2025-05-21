import {ActionIcon, Menu} from "@mantine/core";
import {EllipsisVertical, Folder, Trash} from "lucide-react";
import {Link, useParams} from "@tanstack/react-router";
import {getDefaultFrameworkCoursesSearchValues} from "@/utils/getDefaultFrameworkCoursesSearchValues.ts";
import {CourseSummary} from "@/features/course/types.ts";
import {useRemoveCoursePlacement} from "@/features/study-plan/hooks/useRemoveCoursePlacement.ts";

type Props = {
    course: CourseSummary;
}

export function ProgramMapCourseOptions({course}: Props) {
    const {studyPlanId} = useParams({from: '/_layout/study-plans/$studyPlanId'});

    const removeCoursePlacement = useRemoveCoursePlacement();

    const handleRemoveCoursePlacement = () => removeCoursePlacement.mutate({
        studyPlanId: Number(studyPlanId),
        courseId: course.id
    });

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon
                    color="gray"
                    variant="transparent"
                    loading={removeCoursePlacement.isPending}
                >
                    <EllipsisVertical size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>

                <Link
                    to="/study-plans/$studyPlanId/framework"
                    params={{studyPlanId: String(studyPlanId)}}
                    search={{
                        ...getDefaultFrameworkCoursesSearchValues(),
                        filter: course.code,
                    }}
                >
                    <Menu.Item leftSection={<Folder size={14}/>}>
                        View in framework
                    </Menu.Item>
                </Link>

                <Menu.Divider/>

                <Menu.Item
                    color="red"
                    leftSection={<Trash size={14}/>}
                    onClick={handleRemoveCoursePlacement}
                >
                    Remove
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
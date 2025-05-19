import {ActionIcon, Menu} from "@mantine/core";
import {EllipsisVertical, Folder, Trash} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {getDefaultFrameworkCoursesSearchValues} from "@/utils/getDefaultFrameworkCoursesSearchValues.ts";
import {CourseSummary} from "@/features/course/types.ts";

type Props = {
    studyPlanId: number;
    course: CourseSummary;
}

export function ProgramMapCourseOptions({course, studyPlanId}: Props) {
    return (
        <Menu>
            <Menu.Target>
                <ActionIcon color="gray" variant="transparent">
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
                >
                    Remove
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
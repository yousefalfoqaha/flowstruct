import {ActionIcon, Menu} from "@mantine/core";
import {ArrowLeftRight, EllipsisVertical, Folder, ScrollText, Trash} from "lucide-react";
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

                <Menu.Item
                    leftSection={<ArrowLeftRight size={14} />}
                >
                    Move
                </Menu.Item>

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
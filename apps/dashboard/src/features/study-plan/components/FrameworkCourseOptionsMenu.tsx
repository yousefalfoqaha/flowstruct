import {ActionIcon, Menu, Text} from "@mantine/core";
import {ArrowLeftRight, Ellipsis, ScrollText, Trash} from "lucide-react";
import {modals} from "@mantine/modals";
import {CourseDetailsDisplay} from "@/features/course/components/CourseDetailsDisplay.tsx";
import {SectionsMenuItems} from "@/features/study-plan/components/SectionsMenuItems.tsx";
import {FrameworkCourse} from "@/features/study-plan/types.ts";
import {useRemoveCoursesFromStudyPlan} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import {useParams} from "@tanstack/react-router";

type Props = {
    course: FrameworkCourse;
    sectionId: number
}

export function FrameworkCourseOptionsMenu({course, sectionId}: Props) {
    const {studyPlanId} = useParams({from: '/_layout/study-plans/$studyPlanId'});
    const removeCoursesFromStudyPlan = useRemoveCoursesFromStudyPlan();

    return (
        <Menu>
            <Menu.Target>
                <ActionIcon color="gray" variant="transparent">
                    <Ellipsis size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>{course.code} Actions</Menu.Label>

                <Menu.Item
                    leftSection={<ScrollText size={14}/>}
                    onClick={() => modals.open({
                        title: `${course.code}: ${course.name} Details`,
                        children: <CourseDetailsDisplay courseId={course.id}/>,
                        centered: true
                    })}
                >
                    View details
                </Menu.Item>

                <Menu.Sub>
                    <Menu.Sub.Target>
                        <Menu.Sub.Item leftSection={<ArrowLeftRight size={14}/>}>
                            Change section
                        </Menu.Sub.Item>
                    </Menu.Sub.Target>

                    <Menu.Sub.Dropdown>
                        <SectionsMenuItems courseId={course.id} sectionId={sectionId}/>
                    </Menu.Sub.Dropdown>
                </Menu.Sub>

                <Menu.Divider/>

                <Menu.Item
                    color="red"
                    leftSection={<Trash size={14}/>}
                    onClick={() =>
                        modals.openConfirmModal({
                            title: 'Please confirm your action',
                            children: (
                                <Text size="sm">
                                    Deleting these courses will remove them from the program map and any
                                    prerequisite
                                    relationships. Are you sure you want to proceed?
                                </Text>
                            ),
                            labels: {confirm: 'Remove Courses', cancel: 'Cancel'},
                            onConfirm: () => removeCoursesFromStudyPlan.mutate({
                                courseIds: [course.id],
                                studyPlanId: Number(studyPlanId)
                            })
                        })}
                >
                    Remove
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
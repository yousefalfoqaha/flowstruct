import {Button, Text} from "@mantine/core";
import {openConfirmModal} from "@mantine/modals";
import {Table} from "@tanstack/react-table";
import {Trash} from "lucide-react";
import {FrameworkCourse} from "@/features/study-plan/hooks/useFrameworkCoursesTable.ts";
import {useRemoveCoursesFromSection} from "@/features/study-plan/hooks/useRemoveCourseFromSection.ts";
import React from "react";
import {StudyPlan} from "@/features/study-plan/types.ts";

type RemoveStudyPlanCoursesButtonProps = {
    table: Table<FrameworkCourse>;
    studyPlan: StudyPlan;
}

export function RemoveStudyPlanCoursesButton({table, studyPlan}: RemoveStudyPlanCoursesButtonProps) {
    const removeCoursesFromSection = useRemoveCoursesFromSection();
    const selectedRows = table.getSelectedRowModel().rows;

    return (
        <React.Fragment>
            {selectedRows.length ? (
                <Button
                    onClick={() => openConfirmModal({
                        title: 'Please confirm your action',
                        children: (
                            <Text size="sm">
                                Deleting these courses will remove them from the program map and any
                                prerequisite
                                relationships. Are you sure you want to proceed?
                            </Text>
                        ),
                        labels: {confirm: 'Remove Courses', cancel: 'Cancel'},
                        onConfirm: () => removeCoursesFromSection.mutate({
                            studyPlanId: studyPlan.id,
                            courseIds: selectedRows.map(row => row.original.id),
                        }, {onSuccess: () => table.setRowSelection({})})
                    })}
                    color="red"
                    leftSection={<Trash size={18}/>}
                    loading={removeCoursesFromSection.isPending}
                >
                    Remove ({selectedRows.length})
                </Button>
            ) : null}
        </React.Fragment>
    );
}

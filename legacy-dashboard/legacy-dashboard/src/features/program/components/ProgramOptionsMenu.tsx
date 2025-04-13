import {ActionIcon, Menu, Text} from "@mantine/core";
import {Ellipsis, Eye, EyeOff, Pencil, ScrollText, Trash} from "lucide-react";
import {Program} from "@/features/program/types.ts";
import {modals} from "@mantine/modals";
import {useDeleteProgram} from "@/features/program/hooks/useDeleteProgram.ts";
import {useToggleProgramVisibility} from "@/features/program/hooks/useToggleProgramVisibility.ts";
import {Link} from "@tanstack/react-router";


type ProgramOptionsMenuProps = {
    program: Program;
}

export function ProgramOptionsMenu({program}: ProgramOptionsMenuProps) {
    const deleteProgram = useDeleteProgram();
    const toggleVisibility = useToggleProgramVisibility();

    return (
        <Menu shadow="md">
            <Menu.Target>
                <ActionIcon variant="transparent" color="gray">
                    <Ellipsis size={14}/>
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Actions</Menu.Label>
                <Link style={{textDecoration: 'none'}} to="/dashboard/programs/$programId"
                      params={{programId: String(program.id)}}>
                    <Menu.Item leftSection={<ScrollText size={14}/>}>
                        View
                    </Menu.Item>
                </Link>
                <Link style={{textDecoration: 'none'}} to="/dashboard/programs/$programId/edit"
                      params={{programId: String(program.id)}}>
                    <Menu.Item leftSection={<Pencil size={14}/>}>
                        Edit details
                    </Menu.Item>
                </Link>

                <Menu.Divider/>

                <Menu.Item
                    onClick={() => toggleVisibility.mutate(program.id)}
                    leftSection={program.isPrivate ? <Eye size={14}/> : <EyeOff size={14}/>}
                >
                    {program.isPrivate ? 'Make public' : 'Hide'}
                </Menu.Item>

                <Menu.Item
                    color="red"
                    leftSection={<Trash size={14}/>}
                    onClick={() =>
                        modals.openConfirmModal({
                            title: 'Please confirm your action',
                            children: (
                                <Text size="sm">
                                    Deleting this program will delete all of its study plans. Are
                                    you absolutely sure?
                                </Text>
                            ),
                            labels: {confirm: 'Confirm', cancel: 'Cancel'},
                            onConfirm: () => deleteProgram.mutate(program.id),
                        })
                    }
                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
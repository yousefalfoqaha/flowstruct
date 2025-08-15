import { ActionIcon, Menu } from '@mantine/core';
import { EllipsisVertical } from 'lucide-react';
import { Program } from '@/features/program/types.ts';
import { ProgramDangerousOptionsMenuItems } from '@/features/program/components/ProgramDangerousOptionsMenuItems.tsx';

type Props = {
  program: Program;
  onDeleteSuccess?: () => void;
};

export function ProgramOptionsMenu({ program, onDeleteSuccess }: Props) {
  return (
    <Menu
      width={200}
      shadow="sm"
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
    >
      <Menu.Target>
        <ActionIcon variant="transparent" color="gray">
          <EllipsisVertical size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>

        <ProgramDangerousOptionsMenuItems 
          program={program} 
          onDeleteSuccess={onDeleteSuccess} 
        />
      </Menu.Dropdown>
    </Menu>
  );
}

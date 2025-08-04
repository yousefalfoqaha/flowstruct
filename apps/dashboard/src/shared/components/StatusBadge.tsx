import { Badge } from '@mantine/core';
import classes from '@/features/program/styles/StatusBadge.module.css';
import { Check, Pencil, Plus } from 'lucide-react';

export function StatusBadge(status: string) {
  switch (status) {
    case 'APPROVED':
      return (
        <Badge
          fullWidth
          variant="light"
          classNames={{ root: classes.root }}
          leftSection={<Check size={14} />}
        >
          Approved
        </Badge>
      );
    case 'DRAFT':
      return (
        <Badge
          fullWidth
          variant="outline"
          classNames={{ root: classes.root }}
          leftSection={<Pencil size={14} />}
        >
          Draft
        </Badge>
      );
    case 'NEW':
      return (
        <Badge
          fullWidth
          variant="light"
          color="yellow"
          classNames={{ root: classes.root }}
          leftSection={<Plus size={14} />}
        >
          New
        </Badge>
      );
    default:
      return null;
  }
}

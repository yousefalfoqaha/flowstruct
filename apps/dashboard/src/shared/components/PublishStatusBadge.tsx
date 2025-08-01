import { Badge } from '@mantine/core';
import classes from '@/features/program/components/StatusBadge.module.css';
import { Globe, Pencil, Clock } from 'lucide-react';

export function publishStatusBadge(status: string) {
  switch (status) {
    case 'PUBLISHED':
      return (
        <Badge
          fullWidth
          variant="light"
          classNames={{ root: classes.root }}
          leftSection={<Globe size={14} />}
        >
          Published
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
    case 'PENDING':
      return (
        <Badge
          fullWidth
          variant="light"
          color="yellow"
          classNames={{ root: classes.root }}
          leftSection={<Clock size={14} />}
        >
          Pending
        </Badge>
      );
    default:
      return null;
  }
}

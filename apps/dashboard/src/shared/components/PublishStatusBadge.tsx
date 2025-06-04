import { Badge } from '@mantine/core';
import classes from '@/features/program/components/StatusBadge.module.css';
import { Globe, Pencil } from 'lucide-react';

export function publishStatusBadge(isPublished: boolean) {
  return isPublished ? (
    <Badge variant="light" classNames={{ root: classes.root }} leftSection={<Globe size={14} />}>
      Published
    </Badge>
  ) : (
    <Badge variant="outline" classNames={{ root: classes.root }} leftSection={<Pencil size={14} />}>
      Draft
    </Badge>
  );
}

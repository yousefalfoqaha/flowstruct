import { Badge } from '@mantine/core';

type Props = {
  isArchived: boolean;
};

export function ActiveStatusBadge({ isArchived }: Props) {
  return (
    <Badge variant={isArchived ? 'outline' : 'light'} color={isArchived ? 'gray' : 'green'}>
      {isArchived ? 'Archived' : 'Active'}
    </Badge>
  );
}

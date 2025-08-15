import { Badge } from '@mantine/core';
import classes from '@/shared/styles/ActiveStatus.module.css';

type Props = {
  outdatedAt: Date | null;
};

export function OutdatedStatusBadge({ outdatedAt }: Props) {
  const isOutdated = outdatedAt !== null;
  return (
    <Badge
      classNames={{ root: classes.root }}
      variant={isOutdated ? 'outline' : 'light'}
      color={isOutdated ? 'gray' : 'green'}
    >
      {isOutdated ? 'Outdated' : 'Active'}
    </Badge>
  );
}

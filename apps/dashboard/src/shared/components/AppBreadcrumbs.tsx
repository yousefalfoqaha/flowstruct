import { ChevronRight, Home } from 'lucide-react';
import { isMatch, Link, useMatches } from '@tanstack/react-router';
import { ActionIcon, Breadcrumbs, Button } from '@mantine/core';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';

export function AppBreadcrumbs() {
  const matches = useMatches();

  if (matches.some((match) => match.status === 'pending')) return null;

  const breadcrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'));

  return (
    <>
      <Breadcrumbs visibleFrom="md" separator={<ChevronRight size={14} />} separatorMargin={5}>
        <Link to="/programs" search={DefaultSearchValues()}>
          <ActionIcon mr="xs" size="compact-md" color="gray" variant="transparent">
            <Home size={18} />
          </ActionIcon>
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <Link key={i} to={crumb.pathname || '/'}>
            <Button size="compact-sm" variant="transparent">
              {crumb.loaderData?.crumb}
            </Button>
          </Link>
        ))}
      </Breadcrumbs>
    </>
  );
}

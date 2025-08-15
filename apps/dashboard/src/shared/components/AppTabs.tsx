import { useMatches, useNavigate } from '@tanstack/react-router';
import { Tabs } from '@mantine/core';
import { Route as DetailsRoute } from '@/routes/_layout/study-plans/$studyPlanId/details';
import classes from '@/shared/styles/AppTabs.module.css';
import { NavbarLinks } from '@/shared/types.ts';
import { LibraryBig, ScrollText, User } from 'lucide-react';
import { Route as StudyPlansRoute } from '@/routes/_layout/study-plans';
import { Route as CatalogRoute } from '@/routes/_layout/catalog';
import { Route as UsersRoute } from '@/routes/_layout/users';
import { useAuth } from '@/shared/hooks/useAuth.ts';

export function AppTabs() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { hasPermission } = useAuth();

  const tabs: NavbarLinks[] = [
    { label: 'Study Plans', icon: <ScrollText size={18} />, route: StudyPlansRoute.to },
    { label: 'Catalog', icon: <LibraryBig size={18} />, route: CatalogRoute.to },
    ...(hasPermission('users:read')
      ? [{ label: 'User Management', icon: <User size={18} />, route: UsersRoute.to }]
      : []),
  ];

  const items = tabs.map((tab, index) => (
    <Tabs.Tab value={tab.route} leftSection={tab.icon} key={index}>
      {tab.label}
    </Tabs.Tab>
  ));

  const fullPath = matches.at(-1)?.fullPath ?? '';
  const activeTab = tabs.find((tab) => fullPath.includes(tab.route))?.route ?? DetailsRoute.to;

  return (
    <Tabs
      value={activeTab}
      variant="outline"
      onChange={(val) =>
        navigate({
          to: val ?? '',
        })
      }
      classNames={{
        root: classes.tabs,
        list: classes.tabsList,
        tab: classes.tab,
      }}
    >
      <Tabs.List>{items}</Tabs.List>
    </Tabs>
  );
}

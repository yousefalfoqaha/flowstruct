import { useMatches, useNavigate } from '@tanstack/react-router';
import { Tabs } from '@mantine/core';
import { Route as DetailsRoute } from '@/routes/_layout/study-plans/$studyPlanId/details';
import classes from '@/shared/components/AppTabs.module.css';
import { NavbarLinks } from '@/shared/types.ts';
import { BookOpen, Globe, GraduationCap, ScrollText } from 'lucide-react';
import { Route as ProgramsRoute } from '@/routes/_layout/programs';
import { Route as StudyPlansRoute } from '@/routes/_layout/study-plans';
import { Route as CoursesRoute } from '@/routes/_layout/courses';
import { Route as PublishesRoute } from '@/routes/_layout/publishes';

const tabs: NavbarLinks[] = [
  { label: 'Publishes', icon: <Globe size={18} />, route: PublishesRoute.to },
  { label: 'Programs', icon: <GraduationCap size={18} />, route: ProgramsRoute.to },
  { label: 'Study Plans', icon: <ScrollText size={18} />, route: StudyPlansRoute.to },
  { label: 'Courses', icon: <BookOpen size={18} />, route: CoursesRoute.to },
];

export function AppTabs() {
  const navigate = useNavigate();
  const matches = useMatches();

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

import { ReactNode } from 'react';
import { Container, Group, Image, Tabs, Title } from '@mantine/core';
import classes from './AppLayout.module.css';
import { useMatches, useNavigate } from '@tanstack/react-router';
import { BookOpen, GraduationCap, ScrollText } from 'lucide-react';
import { NavbarLinks } from '@/shared/types.ts';
import { Route as ProgramsRoute } from '@/routes/_layout/programs';
import { Route as StudyPlansRoute } from '@/routes/_layout/study-plans';
import { Route as CoursesRoute } from '@/routes/_layout/courses';
import { Route as DetailsRoute } from '@/routes/_layout/study-plans/$studyPlanId/details';
import { User } from '@/shared/components/User.tsx';

const tabs: NavbarLinks[] = [
  { label: 'Programs', icon: <GraduationCap size={18} />, route: ProgramsRoute.to },
  { label: 'Study Plans', icon: <ScrollText size={18} />, route: StudyPlansRoute.to },
  { label: 'Courses', icon: <BookOpen size={18} />, route: CoursesRoute.to },
];

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
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
    <>
      <div className={classes.header}>
        <Container size="xl">
          <Group justify="space-between">
            <Group>
              <Image
                src="https://www.localized.world/_next/image?url=https%3A%2F%2Fcdn.localized.world%2Forganizations%2F6%2F3207769b-3b1c-4344-b5fd-048ce05c454a.png&w=2440&q=75"
                h={40}
                w={40}
                mt={4}
              />

              <Title size="xl" fw={600}>
                GJUPlans Admin
              </Title>
            </Group>
            <User />
          </Group>
          <Container size="lg">
            <Tabs
              value={activeTab}
              variant="outline"
              visibleFrom="sm"
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
          </Container>
        </Container>
      </div>
      <div className={classes.mainSection}>
        <Container size="xl">{children}</Container>
      </div>
    </>
  );
}

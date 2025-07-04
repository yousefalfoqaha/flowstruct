import { ReactNode, useState } from 'react';
import cx from 'clsx';
import {
  Avatar,
  Container,
  Group,
  Image,
  Menu,
  Tabs,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import classes from './AppLayout.module.css';
import { useMatches, useNavigate } from '@tanstack/react-router';
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  LogOut,
  ScrollText,
  Settings,
  Trash,
} from 'lucide-react';
import { useMe } from '@/features/user/hooks/useMe.ts';
import { NavbarLinks } from '@/shared/types.ts';
import { Route as ProgramsRoute } from '@/routes/_layout/programs/route.tsx';
import { Route as StudyPlansRoute } from '@/routes/_layout/study-plans/route.tsx';
import { Route as CoursesRoute } from '@/routes/_layout/courses';
import { Route as DetailsRoute } from '@/routes/_layout/study-plans/$studyPlanId/details';

const tabs: NavbarLinks[] = [
  { label: 'Programs', icon: <GraduationCap size={18} />, route: ProgramsRoute.to },
  { label: 'Study Plans', icon: <ScrollText size={18} />, route: StudyPlansRoute.to },
  { label: 'Courses', icon: <BookOpen size={18} />, route: CoursesRoute.to },
];

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { data: me } = useMe();
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

            <Menu
              width="200"
              shadow="sm"
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group>
                    <Avatar size={32} radius="xl" />
                    <div>
                      <Text size="md">{me.username}</Text>
                      <Text c="dimmed" size="xs">
                        Administrator
                      </Text>
                    </div>
                    <ChevronDown size={14} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<Settings size={14} />}>Account settings</Menu.Item>
                <Menu.Item leftSection={<LogOut size={14} />}>Logout</Menu.Item>

                <Menu.Divider />
                <Menu.Item color="red" leftSection={<Trash size={14} />}>
                  Delete account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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

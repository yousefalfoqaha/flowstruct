import { Link } from '@tanstack/react-router';
import classes from '@/shared/components/AppSidebar.module.css';
import { ActionIcon, Divider, Group, Stack, Text, Title, Tooltip } from '@mantine/core';
import { BookOpen, GraduationCap, LogOut, ScrollText } from 'lucide-react';
import { NavbarLinks } from '@/shared/types.ts';
import { Route as ProgramsRoute } from '@/routes/_layout/programs/route.tsx';
import { Route as StudyPlansRoute } from '@/routes/_layout/study-plans/route.tsx';
import { Route as CoursesRoute } from '@/routes/_layout/courses';
import { useMe } from '@/features/user/hooks/useMe.ts';
import { useLogout } from '@/features/user/hooks/useLogout.ts';

const data: NavbarLinks[] = [
  { label: 'Programs', icon: GraduationCap, route: ProgramsRoute.to },
  { label: 'Study Plans', icon: ScrollText, route: StudyPlansRoute.to },
  { label: 'Courses', icon: BookOpen, route: CoursesRoute.to },
];

export function AppSidebar() {
  const { data: user } = useMe();
  const logout = useLogout();

  const links = data.map((item) => {
    const Icon = item.icon;
    return (
      <Link
        to={item.route}
        className={classes.link}
        activeOptions={{ exact: false }}
        key={item.route}
      >
        <Icon className={classes.linkIcon} strokeWidth="1.5" />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <nav className={classes.navbar}>
      <Stack align="center" gap={5}>
        <Title ta="center" order={3} fw={600}>
          GJUPlans Admin
        </Title>
      </Stack>

      <Divider my="md" />

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Divider mb="md" />
        <Group justify="space-between" wrap="nowrap">
          <Group>
            <Stack gap={5}>
              <Text>{user.username}</Text>
              <Text c="dimmed" size="xs">
                Administrator
              </Text>
            </Stack>
          </Group>

          <Tooltip label="Log out">
            <ActionIcon
              variant="transparent"
              onClick={() => logout.mutate()}
              loading={logout.isPending}
            >
              <LogOut size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>
    </nav>
  );
}

import { useMatches, useNavigate, useParams } from '@tanstack/react-router';
import { Route as DetailsRoute } from '@/routes/_layout/study-plans/$studyPlanId/details';
import { Folder, Map, ReceiptText } from 'lucide-react';
import { Route as FrameworkRoute } from '@/routes/_layout/study-plans/$studyPlanId/framework.tsx';
import { Route as ProgramMapRoute } from '@/routes/_layout/study-plans/$studyPlanId/program-map.tsx';
import { ReactNode } from 'react';
import { Tabs } from '@mantine/core';

type TabLink = {
  label: string;
  path: string;
  icon: ReactNode;
};

const tabs: TabLink[] = [
  { label: 'Details', path: DetailsRoute.to, icon: <ReceiptText size={18} /> },
  { label: 'Framework', path: FrameworkRoute.to, icon: <Folder size={18} /> },
  { label: 'Program Map', path: ProgramMapRoute.to, icon: <Map size={18} /> },
];

export function StudyPlanTabs() {
  const { studyPlanId } = useParams({ from: '/_layout/study-plans/$studyPlanId' });
  const matches = useMatches();
  const navigate = useNavigate();

  const fullPath = matches.at(-1)?.fullPath ?? '';
  const activeTab = tabs.find((tab) => fullPath.includes(tab.path))?.path ?? DetailsRoute.to;

  return (
    <Tabs
      value={activeTab}
      onChange={(val) =>
        navigate({
          to: val ?? '',
          params: { studyPlanId: studyPlanId },
        })
      }
      variant="pills"
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.path} value={tab.path} leftSection={tab.icon}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

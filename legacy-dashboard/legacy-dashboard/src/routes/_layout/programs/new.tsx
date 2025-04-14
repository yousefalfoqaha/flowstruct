import { createFileRoute, Link } from '@tanstack/react-router'
import { ActionIcon, Group, Stack, Title } from '@mantine/core'
import { ArrowLeft } from 'lucide-react'
import { CreateProgramFieldset } from '@/features/program/components/CreateProgramFieldset.tsx'

export const Route = createFileRoute('/_layout/programs/new')({
  loader: () => ({ crumb: 'Create New Program' }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack>
      <Group>
        <Link to="/programs">
          <ActionIcon size={42} variant="default">
            <ArrowLeft size={18} />
          </ActionIcon>
        </Link>
        <Title order={2} fw={600}>
          Create New Program
        </Title>
      </Group>

      <CreateProgramFieldset />
    </Stack>
  )
}

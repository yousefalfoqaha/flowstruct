import {createFileRoute, Navigate} from '@tanstack/react-router'
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
    return <Navigate to="/programs" search={getDefaultSearchValues()}/>
}

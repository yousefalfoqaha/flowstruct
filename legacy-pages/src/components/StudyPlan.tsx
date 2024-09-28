import { courses } from '@/data/courses'
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
} from './ui/dialog'
import { DataTable } from './courses-table/DataTable'
import { columns } from './courses-table/columns'
import { DialogDescription } from '@radix-ui/react-dialog'

type StudyPlanProps = {
  semesterId: number
  onCloseStudyPlan: () => void
}

export function StudyPlan({ semesterId, onCloseStudyPlan }: StudyPlanProps) {
  return (
    <Dialog
      open={!!semesterId}
      onOpenChange={() => {
        onCloseStudyPlan()
      }}
    >
      <DialogContent className="min-w-[50rem] h-[50rem] flex flex-col">
        <DialogHeader>
          <DialogTitle className='text-xl'>
            Bachelor in Computer Science 2023/2024 Courses
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <DataTable
            columns={columns}
            data={Object.values(courses)}
            semesterId={semesterId}
            onCloseStudyPlan={onCloseStudyPlan}
          />
        </div>
        <DialogFooter className="mt-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

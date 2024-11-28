import {useActiveStudyPlan} from "@/state/activeStudyPlan.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {getLevelLabel, getTypeLabel} from "@/lib/utils.ts";

export function StudyPlan() {
    const {data: studyPlan} = useActiveStudyPlan();

    return (
        studyPlan && (
            <div className="flex flex-col gap-3">
                <Accordion type="single" collapsible className="w-72">
                    {
                        studyPlan.sections.length !== 0
                            ? (
                                studyPlan.sections.map((section) => (
                                    <AccordionItem key={section.id} value={`${section.id}`}>
                                        <AccordionTrigger>
                                            {getLevelLabel(section.level)} {getTypeLabel(section.type)}s
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {section.courses.map(courseId => {
                                                const course = studyPlan.courses.find(c =>
                                                    c.id === courseId
                                                );
                                                if (!course) return;
                                                return <div key={courseId}>{course.code} {course.name}</div>
                                            })}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            )
                            : <div className="p-5 text-muted-foreground text-center">No sections available.</div>
                    }
                </Accordion>
            </div>
        )
    );
}

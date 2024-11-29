import {useActiveStudyPlan} from "@/state/activeStudyPlan.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {getLevelLabel, getTypeLabel} from "@/lib/utils.ts";
import {useProgramOptions} from "@/state/programOptions.ts";
import {Loader2} from "lucide-react";

export function StudyPlan() {
    const {data: studyPlan, isLoading} = useActiveStudyPlan();
    const {data: programs} = useProgramOptions();
    const program = programs.find(p => p.id === studyPlan?.program);


    return (
        <div className={`border w-5/6 h-full rounded-xl p-3 ${isLoading ? "bg-gray-200" : ""}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-500 opacity-50 flex justify-center items-center">
                    <Loader2 className="animate-spin"/>
                </div>
            )}

            {program && studyPlan && (
                <div className="flex flex-col gap-2">
                    <header className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-bold">{`${program.degree} ${program.name}`}</h1>
                        <h3>{`${studyPlan.startAcademicYear}/${studyPlan.startAcademicYear + 1} - ${studyPlan.track}`}</h3>
                    </header>
                    <div className="flex flex-col gap-3 w-full items-center">
                        <Accordion type="single" collapsible className="w-96">
                            {studyPlan.sections.length !== 0
                                ? studyPlan.sections.map((section) => (
                                    <AccordionItem key={section.id} value={`${section.id}`}>
                                        <AccordionTrigger className="text-left w-96">
                                            {getLevelLabel(section.level)} {getTypeLabel(section.type)}s ({section.name})
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {section.courses.map(courseId => {
                                                const course = studyPlan.courses.find(c => c.id === courseId);
                                                if (!course) return null;
                                                return <div key={courseId}>{course.code} {course.name}</div>;
                                            })}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                                : <div className="p-5 text-muted-foreground text-center">No sections available.</div>}
                        </Accordion>
                    </div>
                </div>
            )}
        </div>
    );
}

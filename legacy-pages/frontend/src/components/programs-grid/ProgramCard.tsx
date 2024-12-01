import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ProgramOption} from "@/state/programOptions.ts";

type ProgramCardProps = {
    id: number;
    name: string;
    degree: string;
    selectProgram: (program: ProgramOption) => void;
}

export function ProgramCard({name, degree, selectProgram}: ProgramCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{degree}</CardDescription>
            </CardHeader>
            <CardFooter>
                <div className="flex flex-row gap-1 w-full">
                    <Button onClick={() => selectProgram}>Study Plans</Button>
                    <Button variant="link" className="ml-auto">View Details</Button>
                </div>
            </CardFooter>
        </Card>
    )
}
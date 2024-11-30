import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";

type ProgramProps = {
    name: string;
    degree: string;
    onClick: () => void;
}

export function Program({name, degree, onClick}: ProgramProps) {
    return (
        <Button variant="ghost" onClick={onClick}>
            <p className="w-full text-left font-normal">{degree} {name}</p>
            <ArrowRight />
        </Button>
    )
}
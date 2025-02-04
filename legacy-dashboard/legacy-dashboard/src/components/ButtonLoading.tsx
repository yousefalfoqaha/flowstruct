import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";

export function ButtonLoading() {
    return (
        <Button disabled className="w-fit">
            <Loader2 className="animate-spin"/>
            Please wait
        </Button>
    )
}

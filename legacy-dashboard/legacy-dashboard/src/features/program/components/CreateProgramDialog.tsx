import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {CreateProgramForm} from "@/features/program/components/CreateProgramForm.tsx";

export function CreateProgramDialog() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={() => setIsOpen(true)}>
                <Plus/> Create Program
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Program</DialogTitle>
                    <DialogDescription>
                        This program will be private by default.
                    </DialogDescription>
                </DialogHeader>

                <CreateProgramForm closeDialog={() => setIsOpen(false)}/>
            </DialogContent>
        </Dialog>
    );
}
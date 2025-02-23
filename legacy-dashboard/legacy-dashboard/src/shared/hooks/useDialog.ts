import {useContext} from "react";
import {DialogContext, DialogContextType} from "@/contexts/DialogContext.tsx";

export function useDialog<T>() {
    const context = useContext(DialogContext) as DialogContextType<T>;
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
}
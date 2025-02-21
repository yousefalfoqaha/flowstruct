import { useContext } from "react";
import { DialogContext, DialogContextType } from "@/contexts/DialogContext.tsx";

export const useDialog = <T>() => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }

    return context as unknown as DialogContextType<T>;
};

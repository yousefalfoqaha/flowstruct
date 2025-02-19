import React, {createContext, ReactNode} from "react";

type Dialog = 'EDIT' | 'ADD_COURSES' | 'DELETE';

export type DialogContextType<T> = {
    dialogIsOpen: (dialog: Dialog) => boolean;
    openDialog: (item: T, dialog: Dialog) => void;
    closeDialog: () => void;
    item: T | null;
};

const DialogContext = createContext<DialogContextType<never> | undefined>(undefined);

function DialogProvider<T extends null>({children}: { children: ReactNode }) {
    const [item, setItem] = React.useState<T | null>(null);
    const [activeDialog, setActiveDialog] = React.useState<Dialog | null>(null);

    const openDialog = (item: T, dialog: Dialog) => {
        setItem(item);
        setActiveDialog(dialog);
    };

    const closeDialog = () => {
        setActiveDialog(null);
        setItem(null);
    };

    const dialogIsOpen = (dialog: Dialog) => dialog === activeDialog;

    return (
        <DialogContext.Provider value={{
            dialogIsOpen,
            openDialog,
            closeDialog,
            item
        }}>
            {children}
        </DialogContext.Provider>
    );
}

export {DialogContext, DialogProvider};

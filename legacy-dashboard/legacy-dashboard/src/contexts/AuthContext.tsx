import React, {ReactNode} from "react";
import {api} from "@/shared/api.ts";
import {User} from "@/features/auth/types.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    user: User;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type ProviderProps = {
    children: ReactNode;
}

function AuthProvider({children}: ProviderProps) {


    return (
        <AuthContext.Provider value={}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth cannot be used outside AuthProvider")
    }

    return context;
}

export {AuthContext, AuthProvider, useAuth};
import React, {ReactNode} from "react";
import Cookies from "js-cookie";
import {useQueryClient} from "@tanstack/react-query";
import {MeQuery, userKeys} from "@/features/auth/queries.ts";

type AuthContextType = {
    login: (loginDetails: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type ProviderProps = {
    children: ReactNode;
}

function AuthProvider({children}: ProviderProps) {
    const queryClient = useQueryClient();

    const login = async (token: string) => {
        Cookies.set('token', token);
        await queryClient.ensureQueryData(MeQuery);
    };

    const logout = () => {
        Cookies.remove('token');
        queryClient.removeQueries({queryKey: userKeys.me()});
    }

    return (
        <AuthContext.Provider value={{login, logout}}>
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
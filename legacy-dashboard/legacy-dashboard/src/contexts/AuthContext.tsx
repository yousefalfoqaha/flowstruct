import React, {ReactNode} from "react";
import Cookies from "js-cookie";

type AuthContextType = {
    isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type ProviderProps = {
    children: ReactNode;
}

function AuthProvider({children}: ProviderProps) {
    const isAuthenticated = !!Cookies.get('token');

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
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
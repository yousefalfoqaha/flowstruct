import React, {ReactNode} from "react";

type User = {
    username: string;
}

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

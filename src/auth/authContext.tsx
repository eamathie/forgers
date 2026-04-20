import { createContext, useState } from "react";
import type { User, UserContextType } from "./types";

export const AuthContext = createContext<UserContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const updateUser = (user: User | null) => setUser(user);

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;


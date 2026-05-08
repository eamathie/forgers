import { createContext, useState } from "react";
import type { User, UserContextType } from "./types";

export const AuthContext = createContext<UserContextType | null>(null);

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const updateUser = (user: User | null) => setUser(user);

    return (
        <AuthContext value={{ user, updateUser }}>
            { children }
        </AuthContext>
    )
}

export default AuthProvider;


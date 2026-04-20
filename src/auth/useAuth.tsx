import { useContext } from "react";
import { AuthContext } from "./authContext";
import type { UserContextType } from "./types";

export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext);

    if (!context) 
        throw new Error ("useAuth must be used inside AuthProvider");

    return context;
};


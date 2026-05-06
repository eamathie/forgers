import { createContext, useContext, useState, type ReactNode } from "react";

export interface NameChildrenNodesPair {
    name: string;
    children: ReactNode;
};

interface SidebarContextValue {
    isOpen: boolean;
    toggle: () => void;
    content?: NameChildrenNodesPair[];
    setContent: (c?: NameChildrenNodesPair[]) => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<NameChildrenNodesPair[]>();

    const toggle = () => setIsOpen(p => !p);

    return(
        <SidebarContext value={{ isOpen, toggle, content, setContent }}>
            {children}
        </SidebarContext>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSideBar must be used inside SidebarProvider");
    return context;
}

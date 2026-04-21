import { useEffect } from "react";

export const useOnClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const element = ref?.current;
            if (!element || element.contains(event.target as Node)) return;

            handler();
        };

        document.addEventListener("mousedown", listener, true);

        return () => {
            document.removeEventListener("mousedown", listener, true);
        };
    }, [handler]);
} 
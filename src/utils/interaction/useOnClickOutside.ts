import { useEffect } from "react";

/**
 * Helper-hook that detects clicks outside of the component. Useful for dropdowns and other types of popups/modals
 * @param ref The element that can be clicked outside of
 * @param handler The function that will be called when an outside-click is detected, usually passed from parent
 */
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
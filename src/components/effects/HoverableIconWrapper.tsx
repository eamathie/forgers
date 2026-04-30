import type { ReactNode } from "react"

/**
 * Gives components a circular highlight (background) when told to.
 * @param children - The icon which this wrapper will highlight
 * @param highligh - The boolean value that this listens to. Highlights when true.
 * @param onClick - Function to call when this (basically the icon) is clicked.
 */
// Wrapper component that highlights child icon when clicked. HighlightOn: boolean to listen to, highlights when true. Pass false if icon should never highlight
const HoverableIconWrapper: React.FC<{ children: ReactNode, highlightOn: boolean, onClick?: () => void }> = ({ children, highlightOn, onClick }) => {
    return(
        <div 
        className={`cursor-pointer hover:bg-gray-600 w-10 h-10 md:w-9 md:h-9 relative flex items-center justify-center rounded-full ${highlightOn && "bg-gray-600"}`}
        onClick={onClick}>
            {children}
        </div>
    );
};

export default HoverableIconWrapper;
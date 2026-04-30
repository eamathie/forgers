import { GoChevronDown } from "react-icons/go"

interface ChevronCircleProps {
    isOpen: boolean;
    onClick: () => void;
}

/**
 * @param isOpen - whether the connected element is open or not, state in parent
 * @param onClick - function that is called when chevron is clicked
 */
const ChevronCircle: React.FC<ChevronCircleProps> = ({ isOpen, onClick }) => {
    return (
        <span className={`
            absolute 
            left-[105%] 
            top-[45%]
            w-14 h-14
            rounded-full
            bg-gray-800
            text-white
            flex items-center justify-center
            `}
            onClick={onClick}
            >
            <GoChevronDown
            size={40}
            rotate={90}
            className={`
                duration-150 ease-in-out ${
                isOpen ? "rotate-90" : "-rotate-90"
            }`}
            />
        </span>
    )
}

export default ChevronCircle
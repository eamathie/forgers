import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

interface DropdownCollectionProps {
    children?: React.ReactNode
}

const DropdownCollection: React.FC<DropdownCollectionProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-row min-w-[275px]">
            <GoChevronDown
            size={20}
            className={`transform duration-150 ease-in-out ${
            isOpen ? "rotate-180" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
            />
            <div className="w-full">
                <label htmlFor="dropdown">Sort: </label>
                <hr className="h-0.5 bg-gray-200"/>
                {isOpen && children}        
            </div>
        </div>
    )
}

export default DropdownCollection
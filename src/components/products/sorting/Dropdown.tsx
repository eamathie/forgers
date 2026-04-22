import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

interface DropdownProps {
    criterion: string[];
    onSelect: (criterion: string) => void;
    children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ criterion, onSelect, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(criterion[0]);

    const handleClicked = (criterion: string) => {
        onSelect(criterion);
        setSelected(criterion);
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col md:min-w-[275px]">
            <label>Sort: </label>
            <hr className="h-0.5 bg-gray-200"/>
            <div className="flex flex-col-2 gap-3 justify-items-start items-start">
                <div id="sorting" className="border-2 rounded-lg my-1">
                    <div className="flex flex-row items-center px-2">
                        <h2>{selected}</h2>
                        <GoChevronDown
                        size={20}
                        className={`transform duration-150 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                        }`}
                        onClick={() => setIsOpen(!isOpen)}
                        />
                    </div>
                    <div>
                        {isOpen && (
                            <div className="">
                                <hr className="h-0.5 bg-gray-200" />
                                {criterion.map((c, index) => (
                                    <div 
                                    className="cursor-pointer hover:bg-gray-200 px-2"
                                    key={index} 
                                    onClick={() => handleClicked(c)}
                                    >
                                        {c}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {children}

            </div>
        </div>
    )
}

export default Dropdown;
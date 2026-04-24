import { useState } from "react";
import { createPortal } from "react-dom";
import { GoChevronDown } from "react-icons/go";

interface DropdownProps {
    name: string;
    criterion: string[];
    selected: string;
    onSelect: (criterion: string) => void;
    children?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ name, criterion, selected, onSelect, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClicked = (criterion: string) => {
        onSelect(criterion);
        setIsOpen(false);
    }

    const DesktopDropdownDrawer: React.FC = () => {
        return (
            <>
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
            </>
        );
    };

    const MobileDropdownModal: React.FC = () => {
        return (
            <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-gray-800 bg-opacity-80 pointer-events-none z-20">
                <div className="flex flex-col gap-2 h-[20%] w-[50%] bg-gray-800 rounded-lg outline outline-gray-400 text-xl text-gray-200 p-3 pointer-events-auto">
                    <h2>Select option</h2>
                    <hr className="h-0.5 bg-gray-200" />
                    {criterion.map((c, index) => (
                    <div 
                    className="flex-1 flex items-center rounded-lg bg-gray-700 px-2"
                    key={index} 
                    onClick={() => handleClicked(c)}
                    >
                        {c}
                    </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <label>{name}: </label>
            {/* <hr className="h-0.5 bg-gray-200"/> */}
            <div className="flex flex-col gap-3 justify-items-start items-start">
                <div id="sorting" className="border-2 rounded-lg my-1">
                    <div 
                    className="flex flex-row items-center px-2"
                    onClick={() => setIsOpen(!isOpen)}
                    >
                        <h2>{selected}</h2>
                        <GoChevronDown
                        size={20}
                        className={`transform duration-150 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                        }`}
                        />
                    </div>
                    {isOpen &&
                        <>
                            <div className="block md:hidden">
                                {createPortal(<MobileDropdownModal />, document.body)}
                            </div>
                            <div className="hidden md:block">
                                <DesktopDropdownDrawer />
                            </div>
                        </>}
                </div>
                {children}

            </div>
        </div>
    )
}

export default Dropdown;
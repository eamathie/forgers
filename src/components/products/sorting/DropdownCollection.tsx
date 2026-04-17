import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import RadioButtonListCard from "./RadioButtonListCard";
import type { RadioButtonList } from "../../../types/Types";

const DropdownCollection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const RadioButtonLists: RadioButtonList[] = [
        {
            title: "Price",
            options: ["Low-high", "High-low"]
        },
        {
            title: "Rating",
            options: ["Low-high", "High-low"]
        }
    ];

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
                {isOpen && 
                <div id="dropdown" className="flex flex-row space-x-10">
                    {RadioButtonLists.map((n) => 
                        <RadioButtonListCard key={n.title} title={n.title} options={n.options} />
                    )}
                </div>
                }
            </div>
        </div>
    )
}

export default DropdownCollection
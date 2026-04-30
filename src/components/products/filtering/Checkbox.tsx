import { IconContext } from "react-icons";
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    updateSelectedCategories: (value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, updateSelectedCategories }) => {
    const handleChanged = (value: string) => {
        updateSelectedCategories(value);
    };

    return (
        <label className="flex flex-row h-[50px] md:h-[35px] space-x-4 items-center">
            <div className="flex items-center pointer-events-auto">
                <input 
                className="appearance-none"
                type="checkbox" 
                checked={isChecked}
                onChange={() => handleChanged(label)}
                />
                <div className="block md:hidden">
                    <IconContext value={{ color: "#eab308", size: "32" }}>
                        {isChecked ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
                    </IconContext>
                </div>
                <div className="hidden md:block">
                    <IconContext value={{ color: "#eab308", size: "20" }}>
                        {isChecked ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
                    </IconContext>
                </div>
            </div>
            <h2 className="text-md">{label}</h2>
        </label>
    );
};

export default Checkbox;
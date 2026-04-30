import { useEffect } from "react"
import { IconContext } from "react-icons"
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io"

interface CategorySelectorProps {
    updateSelectedCategories: (value: string) => void;
    selectedCategories: string[];
    categories: string[];
}

interface CheckboxMobileProps {
    label: string;
    isChecked: boolean;
    updateSelectedCategories: (value: string) => void;
}

const CheckboxMobile: React.FC<CheckboxMobileProps> = ({ label, isChecked, updateSelectedCategories }) => {
    const handleChanged = (value: string) => {
        updateSelectedCategories(value);
    }

    useEffect(() => {
        console.log(isChecked);
    }, [isChecked])

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
                    <IconContext.Provider value={{ color: "#eab308", size: "32" }}>
                        {isChecked ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
                    </IconContext.Provider>
                </div>
                <div className="hidden md:block">
                    <IconContext.Provider value={{ color: "#eab308", size: "20" }}>
                        {isChecked ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
                    </IconContext.Provider>
                </div>
            </div>
            <h2 className="text-md">{label}</h2>
        </label>
    )
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ updateSelectedCategories, categories }) => {
    return (
        <div>
            <h2>Categories</h2>
            <hr className="h-0.5 bg-gray-200"/>
            {categories.map(c => 
            <div key={c} className="flex flex-row gap-2" >
                <input 
                name={`category-${c}`} 
                type="checkbox" 
                onClick={() => updateSelectedCategories(c)}
                value={c}
                />
                <label>{c}</label>
            </div>
            )}
        </div>
    )   
}


export const MobileCategorySelector: React.FC<CategorySelectorProps> = ({ updateSelectedCategories, selectedCategories, categories }) => {
    
    return (
        <>
            {categories.map(c => 
                <CheckboxMobile key={c} label={c} updateSelectedCategories={updateSelectedCategories} isChecked={selectedCategories.includes(c)}/>
            )}
        </>
    )   
}
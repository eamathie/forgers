import Checkbox from "./Checkbox";

interface CategorySelectorProps {
    updateSelectedCategories: (value: string) => void;
    selectedCategories: string[];
    categories: string[];
}

export const CategorySelector = ({ updateSelectedCategories, selectedCategories, categories }: CategorySelectorProps) => {    
    return (
        <>
            {categories.map(c => 
                <Checkbox key={c} label={c} updateSelectedCategories={updateSelectedCategories} isChecked={selectedCategories.includes(c)}/>
            )}
        </>
    );   
};
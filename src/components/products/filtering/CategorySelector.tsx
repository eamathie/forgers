import Checkbox from "./Checkbox";

interface CategorySelectorProps {
    updateSelectedCategories: (value: string) => void;
    selectedCategories: string[];
    categories: string[];
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ updateSelectedCategories, selectedCategories, categories }) => {    
    return (
        <>
            {categories.map(c => 
                <Checkbox key={c} label={c} updateSelectedCategories={updateSelectedCategories} isChecked={selectedCategories.includes(c)}/>
            )}
        </>
    );   
};
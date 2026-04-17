interface CategorySelectorProps {
    updateSelectedCategories: (value: string) => void
    categories: string[]
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ updateSelectedCategories, categories }) => {
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

export default CategorySelector;
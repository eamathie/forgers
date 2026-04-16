interface CategorySelectorProps {
    setSelectedCategory: (value: string) => void
    categories: string[]
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ setSelectedCategory, categories }) => {
    return (
        <div>
        {categories.map(c => 
        <div key={c} >
            <input 
            name="category" 
            type="radio" 
            onClick={() => setSelectedCategory(c)}
            value={c}
            />
            <label>{c}</label>
        </div>
        )}
        </div>
    )   
}

export default CategorySelector;
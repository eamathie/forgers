import { useFetch } from "../../utils/useFetch"
import { URIProductsAll } from "../../utils/fake_store_api/Products";
import { useState } from "react";
import { type Product, type DropdownSetup } from "../../types/Types";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import CategorySelector from "./filtering/CategorySelector";
import RadioButtonListCard from "./sorting/RadioButtonListCard";
import Dropdown from "./sorting/Dropdown";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product[]>(URIProductsAll);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<string | undefined>(undefined) 
    const [selectedDropdownItem, setSelectedDropdownItem] = useState<string | undefined>(undefined);

    // implicitly update selectedCategories array when CategorySelector checkboxes are changed
    const updateSelectedCategories = (value: string) => {
        setSelectedCategories(prev => {
            if (prev.some(e => e === value)) 
                return prev.filter(e => e !== value)
            else 
                return [...prev, value]
        })
    }

    const handleDropdownSelected = (criterion: string) => { setSelectedDropdownItem(criterion) };
    const handleSortingOptionSelected = (option: string) => { setSelectedSortOption(option) };

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const categories = [... new Set(products?.map(p => p.category))];
    const dropDowns: DropdownSetup[] = [
        { title: "Price", options: ["Low-high", "High-low"] },
        { title: "Rating", options: ["Low-high", "High-low"] },
    ]

    return (
        <div className="flex flex-col mx-[8vw] px-5 gap-10 my-3">
            <div className="flex flex-row gap-5">
                <CategorySelector updateSelectedCategories={updateSelectedCategories} categories={categories}/>
                <Searchbar onChange={setSearchQuery} />
                <Dropdown criterion={dropDowns.map(d => d.title)} onSelect={handleDropdownSelected} >
                    {selectedDropdownItem && dropDowns.find(d => d.title === selectedDropdownItem)?.options && <RadioButtonListCard options={dropDowns.find(d => d.title === selectedDropdownItem)!.options} onSelect={handleSortingOptionSelected} />}
                </Dropdown>
            </div>
            <div className="grid grid-cols-4 gap-8">
                {products?.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())) // filter on search query
                .filter(product => selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase() === product.category.toLowerCase())) // filter on categories, show all if no category is selected
                .sort((a, b) => {
                    if (!selectedDropdownItem || !selectedSortOption) return 0;
                    if (selectedDropdownItem === "Price") {
                        if (selectedSortOption === "Low-high")
                            return a.price - b.price;
                        if (selectedSortOption === "High-low")
                            return b.price - a.price;
                    } 
                    if (selectedDropdownItem === "Rating") {
                        if (selectedSortOption === "Low-high")
                            return a.rating.rate - b.rating.rate;
                        if (selectedSortOption === "High-low")
                            return b.rating.rate - a.rating.rate;
                    }
                    return 0;
                })
                .map(product => (
                    <ProductCard 
                    key={product.id} 
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                    image={product.image}
                    rating={product.rating}
                    />
                ))}
            </div>
        </div>
    )
}

export default Products
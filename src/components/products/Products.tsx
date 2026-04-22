import { useFetch } from "../../utils/useFetch"
import { URIProducts } from "../../utils/fake_store_api/Products";
import { useEffect, useState } from "react";
import { type Product, type DropdownSetup } from "../../types/Types";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import CategorySelector from "./filtering/CategorySelector";
import RadioButtonListCard from "./sorting/RadioButtonListCard";
import Dropdown from "./sorting/Dropdown";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product>(URIProducts);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null) 
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

    // reset radio buttons (all unchecked) when selecting new sorting category from dropdown
    useEffect(() => {
        setSelectedSortOption(null);
    }, [selectedDropdownItem])

    const handleDropdownSelected = (criterion: string) => { setSelectedDropdownItem(criterion) };
    const handleSortingOptionSelected = (option: string) => { setSelectedSortOption(option) };

    // don't attempt to render stuff if data doesn't exist
    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const categories: string[] = [... new Set(products?.map(p => p.category))]; // scan for categories in all products (yes, this means "men's clothing" and "Men's clothing" would be separate categories...)
    const dropDowns: DropdownSetup[] = [ // used for setting up dropdown and its option in <Dropdown /> and its child <RadioButtonListCard /> returned JSX
        { title: "Price", options: ["Low-high", "High-low"] },
        { title: "Rating", options: ["Low-high", "High-low"] },
    ]
    
    const sortComparators: Record<string, (a: Product, b: Product) => number> = { // this vastly shortens the code that handles filtering and sorting below, and makes it trivial to sort on additional attributes by adding records (thanks CoPilot)
        Price: (a, b) => a.price - b.price,
        Rating: (a, b) => a.rating.rate - b.rating.rate,
    };

    const normalizedQuery = searchQuery.toLowerCase(); // obviously do this before attempting to filter on search query

    // filtering on search query and category, and sort based on dropdown criterion and radio button option. this whole thing below used to be like a 20 lines long JSX expression, sortComparators above saves the day 
    const productsVisible: Product[] = products.filter(product => product.title.toLowerCase().includes(normalizedQuery))
    .filter(product => selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase() === product.category.toLowerCase()))
    .slice()
    .sort((a, b) => {
        if (!selectedDropdownItem || !selectedSortOption) return 0;
        const comparator = sortComparators[selectedDropdownItem];
        if (!comparator) return 0;
        const result = comparator(a,b);
        return selectedSortOption === "Low-high" ? result : -result;
    });

    return (
        <div className="flex flex-col mx-[8vw] px-5 gap-10 my-3">
            <div className="flex flex-row gap-5">
                <CategorySelector updateSelectedCategories={updateSelectedCategories} categories={categories}/>
                <Searchbar onChange={setSearchQuery} />
                <Dropdown criterion={dropDowns.map(d => d.title)} onSelect={handleDropdownSelected} >
                    {selectedDropdownItem && dropDowns.find(d => d.title === selectedDropdownItem)?.options && 
                    <RadioButtonListCard options={dropDowns.find(d => d.title === selectedDropdownItem)!.options} selected={selectedSortOption} onSelect={handleSortingOptionSelected} />}
                </Dropdown>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-8">
                {productsVisible
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
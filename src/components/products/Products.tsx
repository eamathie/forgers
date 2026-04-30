import { useFetch } from "../../utils/useFetch"
import { URIProducts } from "../../utils/fake_store_api/Products";
import { useEffect, useState } from "react";
import { type Product, type DropdownSetup } from "../../types/Types";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import { MobileCategorySelector } from "./filtering/CategorySelector";
import Dropdown from "./sorting/Dropdown";
import { sortComparators } from "./sorting/utils";
import MobileSidebar from "../navbar/MobileSidebar";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product>(URIProducts);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<string>("None") 
    const [selectedDropdownOption, setSelectedDropdownOption] = useState<string>("None");

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
        setSelectedSortOption("None");
    }, [selectedDropdownOption])

    const handleDropdownSelected = (criterion: string) => { setSelectedDropdownOption(criterion) };
    const handleSortingOptionSelected = (option: string) => { setSelectedSortOption(option) };

    // don't attempt to render stuff if data doesn't exist
    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const categories: string[] = [... new Set(products?.map(p => p.category))]; // scan for categories in all products (yes, this means "men's clothing" and "Men's clothing" would be separate categories...)
    const dropDowns: DropdownSetup[] = [ // used for setting up dropdown and its option in <Dropdown /> and its child <RadioButtonListCard /> returned JSX
        { title: "Price", options: ["Low-high", "High-low"] },
        { title: "Rating", options: ["Low-high", "High-low"] },
        { title: "None", options: []},
    ]

    const normalizedQuery = searchQuery.toLowerCase(); // obviously do this before attempting to filter on search query

    // filtering on search query and category, and sort based on dropdown criterion and radio button option. this whole thing below used to be like a 20 lines long JSX expression, sortComparators above saves the day 
    const productsVisible: Product[] = products.filter(product => product.title.toLowerCase().includes(normalizedQuery))
    .filter(product => selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase() === product.category.toLowerCase()))
    .slice()
    .sort((a, b) => {
        if (selectedDropdownOption === "None" || selectedSortOption === "None") return 0;
        const comparator = sortComparators[selectedDropdownOption];
        if (!comparator) return 0;
        const result = comparator(a, b);
        return selectedSortOption === "Low-high" ? result : -result;
    });

    const MobileSort: React.FC = () => {
        return (
            <div className="flex flex-col gap-2">
                <Dropdown name="Criterion" selected={selectedDropdownOption} criterion={dropDowns.map(d => d.title)} onSelect={handleDropdownSelected} />
                {selectedDropdownOption !== "None" && dropDowns.find(d => d.title === selectedDropdownOption)?.options && 
                <Dropdown name="Option" selected={selectedSortOption} criterion={dropDowns.find(d => d.title === selectedDropdownOption)!.options} onSelect={handleSortingOptionSelected} />}
            </div>
        );
    };  

    return (
        <div className="h-full">
            <span className="md:hidden">
                <MobileSidebar nameChildrenNodesPairs={[
                    {name: "Categories", children: <MobileCategorySelector updateSelectedCategories={updateSelectedCategories} selectedCategories={selectedCategories} categories={categories}/>},
                    {name: "Sort", children: <MobileSort />}
                ]}/>
            </span>
            <div className="flex flex-col gap-5 md:gap-10 py-3 h-screen">
                <div className="flex flex-col gap-2 px-10 md:px-32">    
                    <Searchbar onChange={setSearchQuery}/>
                    <div className="hidden md:block ">
                        <div className="flex flex-row gap-10">
                            <div className="w-1/4">
                                <h2>Categories: </h2>
                                <hr className="h-0.5 bg-gray-200"/>
                                <MobileCategorySelector updateSelectedCategories={updateSelectedCategories} selectedCategories={selectedCategories} categories={categories}/>
                            </div>
                            <div className="w-1/4">
                                <h2>Sort: </h2>
                                <hr className="h-0.5 bg-gray-200"/>
                                <MobileSort />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto px-10 md:px-32 p-1">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-8">
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
            </div>
        </div>
    )
}

export default Products
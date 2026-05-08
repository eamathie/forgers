import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../../utils/useFetch"
import { URIProducts } from "../../utils/fake_store_api/Products";
import { type Product } from "../../types/Types";
import { dropDowns } from "./sorting/data";
import { CategorySelector } from "./filtering/CategorySelector";
import { filterProducts, sortProducts } from "./sorting/utils";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import Dropdown from "./sorting/Dropdown";
import DesktopFilterSort from "./DesktopFilterSort";
import { useSidebar } from "../navbar/SidebarContext";

const Products = () => {
    const { data: products, loading, error } = useFetch<Product>(URIProducts);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSortOption, setSelectedSortOption] = useState<string>("None") 
    const [selectedDropdownOption, setSelectedDropdownOption] = useState<string>("None");
    const { setContent } = useSidebar();

    // implicitly update selectedCategories array when CategorySelector checkboxes are changed
    const updateSelectedCategories = (value: string) => {
        setSelectedCategories(prev => {
            if (prev.some(e => e === value)) 
                return prev.filter(e => e !== value)
            else 
                return [...prev, value]
        })
    }
    
    const handleDropdownSelected = (criterion: string) => { setSelectedDropdownOption(criterion) };
    const handleSortingOptionSelected = (option: string) => { setSelectedSortOption(option) };
    
    // scan for categories in all products (yes, this means "men's clothing" and "Men's clothing" would be separate categories...)
    const categories = useMemo(() => 
        products ? [...new Set(products.map(p => p.category))] : []
    , [products]);

    // filter and sort products
    const filteredProducts = useMemo(() => 
        filterProducts(products, selectedCategories, searchQuery)
    , [products, selectedCategories, searchQuery]);
    
    const sortedProducts = useMemo(() =>
        sortProducts(filteredProducts, selectedDropdownOption, selectedSortOption)
    , [filteredProducts,selectedDropdownOption, selectedSortOption]);
    
    // reset radio buttons (all unchecked) when selecting new sorting category from dropdown
    useEffect(() => {
        setSelectedSortOption("None");
    }, [selectedDropdownOption]);
    
    const SortDropdowns: React.FC = () => {
        return (
            <div className="flex flex-col gap-2">
                <Dropdown name="Criterion" selected={selectedDropdownOption} criterion={dropDowns.map(d => d.title)} onSelect={handleDropdownSelected} />
                {selectedDropdownOption !== "None" && dropDowns.find(d => d.title === selectedDropdownOption)?.options && 
                <Dropdown name="Option" selected={selectedSortOption} criterion={dropDowns.find(d => d.title === selectedDropdownOption)!.options} onSelect={handleSortingOptionSelected} />}
            </div>
        );
    };  
    
    const sidebarContent = useMemo(() =>
        [
            {
                name: "Categories",
                children: (
                    <CategorySelector
                        updateSelectedCategories={updateSelectedCategories}
                        selectedCategories={selectedCategories}
                        categories={categories}
                    />
                )
            },
            {
                name: "Sort",
                children: <SortDropdowns />
            }
        ],
        [categories, selectedCategories, selectedDropdownOption, selectedSortOption]
    );
    
    // set sidebar content
    useEffect(() => {
        setContent(sidebarContent);
    }, [sidebarContent, setContent]);

    // reset sidebar content when page exited
    useEffect(() => {
        return () => setContent(undefined);
    }, [setContent])
    
    // don't attempt to render stuff if data doesn't exist
    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div className="relative flex-1 min-h-0 flex flex-col">
            <div className="flex-1 flex flex-col py-3 px-10 md:px-32 min-h-0">
                <div className="flex flex-col mb-3 gap-2">    
                    <Searchbar onChange={setSearchQuery}/>
                    <div className="hidden md:block">
                        <div className="flex flex-col gap-1">
                            <DesktopFilterSort updateSelectedCategories={updateSelectedCategories} selectedCategories={selectedCategories} categories={categories} SortDropdowns={SortDropdowns}  />
                        </div>
                    </div>
                </div>
                <hr className="h-0.5 bg-gray-200"/>
                <div className="flex-1 min-h-0 overflow-y-auto py-2 px-1">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-8">
                        {sortedProducts
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
                <hr className="h-0.5 bg-gray-200"/>
            </div>
        </div>
    )
}

export default Products;
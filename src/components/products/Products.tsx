import { useFetch } from "../../utils/useFetch"
import { URIProductsAll } from "../../utils/fake_store_api/Products";
import { useEffect, useState } from "react";
import { type SelectedRadioButtonOption, type Product } from "../../types/Types";
import { radioButtonLists } from "../../data/Data";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import CategorySelector from "./filtering/CategorySelector";
import DropdownCollection from "./sorting/DropdownCollection";
import RadioButtonListCard from "./sorting/RadioButtonListCard";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product[]>(URIProductsAll);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSortOptions, setSelectedSortOptions] = useState<SelectedRadioButtonOption[]>([]) 

    // implicitly update selectedCategories array when CategorySelector checkboxes are changed
    const updateSelectedCategories = (value: string) => {
        setSelectedCategories(prev => {
            if (prev.some(e => e === value)) 
                return prev.filter(e => e !== value)
            else 
                return [...prev, value]
        })
    }

    useEffect(() => {
        console.log(selectedSortOptions);
    }, [selectedSortOptions])

    const handleSelected = (title: string, option: string) => {
        setSelectedSortOptions(prev => {
            if (prev.some(o => o.title === title))
                return [...prev.filter(o => o.title !== title), {title: title, option: option}]
            else
                return [...prev, {title: title, option: option}]
        })
    }

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const categories = [... new Set(products?.map(p => p.category))];
    const sortedOnPrice: SelectedRadioButtonOption | undefined = selectedSortOptions.find(o => o.title === "Price");
    const sortedOnRating: SelectedRadioButtonOption | undefined = selectedSortOptions.find(o => o.title === "Rating");

    return (
        <div className="flex flex-col mx-[8vw] px-5 gap-10 my-3">
            <div className="flex flex-row gap-5">
                <CategorySelector updateSelectedCategories={updateSelectedCategories} categories={categories}/>
                <Searchbar onChange={setSearchQuery} />
                <DropdownCollection>
                    <div id="dropdown" className="flex flex-row space-x-10">
                    {radioButtonLists.map((n) => 
                        <RadioButtonListCard key={n.title} title={n.title} options={n.options} onSelect={handleSelected} />
                    )}
                    </div>
                </DropdownCollection>
            </div>
            <div className="grid grid-cols-4 gap-8">
                {products?.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())) // filter on search query
                .filter(product => selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase() === product.category.toLowerCase())) // filter on categories, show all if no category is selected
                .sort((a, b) => {
                    if (!sortedOnPrice) return 0;
                    if (sortedOnPrice.option === "Low-high")
                        return a.price - b.price;
                    if (sortedOnPrice.option === "High-low")
                        return b.price - a.price;
                    return 0;
                })
                .sort((a, b) => {
                    if (!sortedOnRating) return 0;
                    if (sortedOnRating.option === "Low-high")
                        return a.rating.rate - b.rating.rate;
                    if (sortedOnRating.option === "High-low")
                        return b.rating.rate - a.rating.rate;
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
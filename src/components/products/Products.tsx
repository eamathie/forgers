import { useFetch } from "../../utils/useFetch"
import type { Product } from "../../types/Types";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import { useState } from "react";
import CategorySelector from "./filtering/CategorySelector";
import { URIProductsAll } from "../../utils/fake_store_api/Products";
import DropdownCollection from "./sorting/DropdownCollection";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product[]>(URIProductsAll);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // implicitly update selectedCategories array when CategorySelector checkboxes are changed
    const updateSelectedCategories = (value: string) => {
        setSelectedCategories(prev => {
            if (prev.some(e => e === value)) 
                return prev.filter(e => e !== value)
            else 
                return [...prev, value]
        })
    }

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    const categories = [... new Set(products?.map(p => p.category))];

    return (
        <div className="flex flex-col mx-20 gap-5 p-3">
            <div className="flex flex-row gap-5">
                <CategorySelector updateSelectedCategories={updateSelectedCategories} categories={categories}/>
                <Searchbar onChange={setSearchQuery} />
                <DropdownCollection />
            </div>
            <div className="grid grid-cols-4 gap-8 ">
                {products?.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase())) // filter on search query
                .filter(product => selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase() === product.category.toLowerCase())) // filter on categories, show all if no category is selected
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
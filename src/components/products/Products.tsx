import { useFetch } from "../../utils/useFetch"
import type { Product } from "../../types/Types";
import ProductCard from "./ProductCard";
import Searchbar from "./filtering/Seachbar";
import { useState } from "react";
import CategorySelector from "./filtering/CategorySelector";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products');
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const categories = [... new Set(products?.map(p => p.category))];

    return (
        <div className="flex flex-col mx-20 gap-5 p-3">
            <div className="flex flex-row">
                <Searchbar onChange={setSearchQuery} />
                <CategorySelector setSelectedCategory={setSelectedCategory} categories={categories}/>
            </div>
            <div className="grid grid-cols-4 gap-8 ">
                {products?.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .filter(product => selectedCategory !== "" ? product.category === selectedCategory : true)
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
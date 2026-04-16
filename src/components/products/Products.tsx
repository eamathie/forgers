import { useFetch } from "../../utils/useFetch"
import type { Product } from "../../types/Types";
import ProductCard from "./ProductCard";

const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products');

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>


    return (
        <div className="grid grid-cols-4 gap-8 p-3 items-stretch mx-20">
            {products?.map(product => (
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
    )
}

export default Products
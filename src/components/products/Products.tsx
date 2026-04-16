import { useFetch } from "../../utils/useFetch"

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
} 

type Rating = {
    rate: number;
    count: number;
}
const Products: React.FC = () => {
    const {data: products, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products');

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error.message}</div>


    return (
        <ul>
            {products?.map(product => (
                <li key={product.id}>{product.title}</li>
            ))}
        </ul>
    )
}

export default Products
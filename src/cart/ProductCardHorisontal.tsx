import type { Product } from "../types/Types";

interface ProductCardHorisontalProps {
    product: Product;
    quantity: number;
}

const ProductCardHorisontal: React.FC<ProductCardHorisontalProps> = ({ product, quantity }) => {
    return (
        <div className="flex flex-row gap-5 items-center bg-white rounded-lg outline outline-gray-300 shadow-lg text-xs text-left p-4">
            <div className="w-10 flex-none flex justify-center">
                <img className="object-contain object-center" src={product.image}></img>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <h2 className="line-clamp-2 font-bold">{product.title}</h2>
                <h2>Quantity: {quantity}</h2>
                <h2>Price: {(product.price * 10).toFixed(2)} kr</h2>
            </div>
        </div>
    );
};

export default ProductCardHorisontal;
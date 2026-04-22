import type { Product } from "../types/Types";

interface ProductCardHorisontalProps {
    product: Product;
    quantity: number;
}

const ProductCardHorisontal: React.FC<ProductCardHorisontalProps> = ({ product, quantity }) => {
    return (
        <div className="flex flex-row gap-5 h-24 bg-white rounded-lg outline outline-gray-300 shadow-lg text-xs text-left p-4">
            <div className="w-1/4 flex h-full items-center justify-center">
                <img className="max-h-full object-contain" src={product.image}></img>
            </div>
            <div className="flex-1">
                <h2 className="line-clamp-2 font-bold">{product.title}</h2>
                <hr className="h-0.5 bg-gray-200"/>
                <div className="">
                    <h2>Quantity: {quantity}</h2>
                    <h2>Price: {(product.price * 10).toFixed(2)} kr</h2>
                </div>
            </div>
        </div>
    );
};

export default ProductCardHorisontal;
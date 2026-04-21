import type { Product } from "../types/Types";

const ProductCardHorisontal: React.FC<Product> = ({ title, price, category, image, rating }) => {
    return (
        <div className="grid grid-rows-2 aspect-[3/2] gap-3 items-center bg-white rounded-lg outline outline-gray-300 hover:outline-yellow-500 shadow-lg text-xs text-left p-3">
            {title}
        </div>
    );
};

export default ProductCardHorisontal;
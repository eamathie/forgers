import type { Product } from "../../types/Types";

const ProductCard: React.FC<Product> = ({ title, price, category, image, rating }) => {
    return (
        <div className="flex flex-col h-64 gap-3 bg-white rounded-lg outline outline-gray-300 hover:outline-yellow-500 shadow-lg text-xs text-left p-3">
            <div className="h-[40%] flex justify-center rounded-sm bg-white">
                <img className="max-h-full object-contain object-center" src={image}></img>
            </div>
            <hr className="flex-none h-0.5 bg-gray-200"/>
            <div className="flex-1">
                <div className="flex flex-col h-full gap-1 text-xs">
                    <h3 className="font-bold line-clamp-2">{title}</h3>
                    <div className="flex flex-col gap-1 text-xs">
                        <h2>Rating: {rating.rate}/5</h2>
                        <h2>Price: {(price * 10).toFixed(2)} kr</h2>
                        <h2>Category: {category}</h2>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductCard;
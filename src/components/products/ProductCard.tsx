import type { Product } from "../../types/Types";

const ProductCard: React.FC<Product> = ({ title, price, category, image, rating }) => {
    return (
        <div className="grid grid-rows-2 aspect-[2/3] gap-3 items-center bg-white rounded-lg outline outline-gray-200 shadow-lg text-xs text-left p-3">
            <div className="h-full flex justify-center">
                <img className="h-full object-contain object-center" src={image}></img>
            </div>
            <div className="h-full">
                <div className="flex flex-col gap-2">
                    <hr className="h-0.5 bg-gray-200"/>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <h3>Rating: {rating.rate}/5</h3>
                    <h3>Price: {price * 10} kr</h3>
                    <h3>Category: {category}</h3>
                </div>
            </div>
        </div>
    )

}

export default ProductCard;
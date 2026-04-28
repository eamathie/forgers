import { useRef } from "react";
import type { Cart, Product } from "../types/Types";
import { URIProducts } from "../utils/fake_store_api/Products";
import { useFetch } from "../utils/useFetch";
import { useOnClickOutside } from "../utils/interaction/useOnClickOutside";
import ProductCardHorisontal from "./ProductCardHorisontal";

interface ProductCardListProps {
    cart: Cart | null;
    onClickOutside: () => void;
}

const ProductCardList: React.FC<ProductCardListProps> = ({ cart, onClickOutside }) => {
    const productIds = cart?.products.map(p => p.productId.toString());
    const productsUrl = cart ? URIProducts : undefined;
    const {data: products, loading, error } = useFetch<Product>(productsUrl, productIds)
    
    const ref = useRef<HTMLDivElement | null>(null);

    // close when user clicks outside
    useOnClickOutside(ref, () => {
        onClickOutside();
    })

    return(
        <div ref={ref} className="flex flex-col w-[200px] gap-2 bg-white z-0 rounded-lg outline outline outline-yellow-500 shadow-lg text-sm text-left p-3">
            {loading ? 
            <h2>Loading...</h2> :
            <div className="flex flex-col gap-2">
                <h2>Items in cart: {products.length}</h2>
                <hr className="h-0.5 bg-gray-200"/>
                {products.length === 0 
                ?
                <h2 className="italic">No items</h2> 
                :
                <div className="grid grid-cols-1 justify-items-stretch gap-2">
                    {products.map(p => {
                        const quantity = cart?.products.find(pr => pr.productId === p.id)?.quantity ?? 0;
                        return (
                            <ProductCardHorisontal
                            key={`product-${p.id}`}
                            product={p}
                            quantity={quantity}
                            />
                        );
                    })}
                </div>
                }
            </div>
            }
            <hr className="h-0.5 bg-gray-200"/>
            <h2>Total: {products.reduce((sum, product) => sum + product.price, 0) * 10} kr</h2>
        </div>
    )
}

export default ProductCardList;
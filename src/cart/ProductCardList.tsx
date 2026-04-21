import { useRef } from "react";
import type { Cart, Product } from "../types/Types";
import { URIProducts } from "../utils/fake_store_api/Products";
import { useFetch } from "../utils/useFetch";
import { useOnClickOutside } from "../utils/interaction/useOnClickOutside";

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
        <div ref={ref} className="flex flex-col gap-1 bg-white z-0 rounded-lg outline outline outline-yellow-500 shadow-lg text-xs text-left p-3">
            {products.map(p => 
                <h2 key={`product-${p.id}`}>{p.title}</h2>
            )}
        </div>
    )
}

export default ProductCardList;
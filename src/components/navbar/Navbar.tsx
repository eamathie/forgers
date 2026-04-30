import { useState} from "react";
import { IconContext } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import LoginRegister from "../../auth/components/LoginRegister";
import { useAuth } from "../../auth/useAuth";
import { useFetch } from "../../utils/useFetch";
import { URICartsAll } from "../../utils/fake_store_api/Carts";
import type { Cart } from "../../types/Types";
import ProductCardList from "../../cart/ProductCardList";
import { Link, NavLink } from "react-router";
import HoverableIconWrapper from "../effects/HoverableIconWrapper";

const Navbar: React.FC = () => {
    const [userDialogueActive, setUserDialogueActive] = useState(false);
    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const { user } = useAuth();
    const { data: carts } = useFetch<Cart>(URICartsAll);
    
    const userCart: Cart | null = carts?.find(c => c.userId === user?.id) ?? null;
    
    const handeUserIconClicked = () => setUserDialogueActive(prev => !prev);
    const handleShoppingCartClicked = () => setShoppingCartActive(prev => !prev);
    
    // The tiny numbered dot that appears on top of the shopping cart symbol when it holds items
    const CartNumberedCircle: React.FC<{number: number}> = ({ number }) => {
        if (number === 0) return null;
        return (
            <span className={`
                absolute
                top-0
                right-0
                w-3 h-3
                rounded-full
                bg-red-500
                text-white
                ${number >= 10 && number < 100 ? "text-[8px]" : "text-[10px]"}
                flex items-center justify-center
                pointer-events-none
                `}>
                {number < 100 ? number : "∞"}
            </span>
        )
    }
    
    return (
        <IconContext.Provider value={{ color: "white" }}>
            <div className="h-[60px] md:h-[50px] w-full px-6 md:px-10 flex flex-row justify-between items-center text-gray-200 bg-gray-800">
                <Link className="text-yellow-300 text-2xl font-bold italic" to="/">Forgers™</Link>
                <div className="hidden md:block">
                    <nav className="flex flex-row gap-5 items-center">
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="/" end>Store</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="*" end>Exclusive deals</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="*" end>About</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="*" end>Contact</NavLink>
                    </nav>
                </div>
                <div className="flex flex-row items-center gap-4 md:gap-2">
                    <HoverableIconWrapper highlightOn={shoppingCartActive} onClick={handleShoppingCartClicked}>
                        <IoCartOutline className="w-7 h-7 md:w-6 md:h-6"/>
                        <CartNumberedCircle number={userCart ? userCart.products.length : 0}/>
                    </HoverableIconWrapper>
                    <HoverableIconWrapper highlightOn={userDialogueActive} onClick={handeUserIconClicked}>
                        <FaRegUser className="w-6 h-6 md:w-5 md:h-5"/>
                        {/* <UserIconName name={user && user.name.firstname}/> */}
                    </HoverableIconWrapper>
                </div>            
            </div>
            <hr className="h-0.5 bg-yellow-300"/>
            {userDialogueActive && 
                <div className="absolute right-1">
                    <LoginRegister onClickOutside={() => setUserDialogueActive(false)} />
                </div> }
            {shoppingCartActive && 
            <div className="absolute right-1">
                <ProductCardList cart={userCart ?? null} onClickOutside={() => setShoppingCartActive(false)} />
            </div>}
        </IconContext.Provider>
    )
};

export default Navbar;
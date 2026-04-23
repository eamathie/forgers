import { useState, type ReactNode } from "react";
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

const Navbar: React.FC = () => {
    const [userDialogueActive, setUserDialogueActive] = useState(false);
    const [shoppingCartActive, setShoppingCartActive] = useState(false);
    const { user } = useAuth();
    const { data: carts, loading, error } = useFetch<Cart>(URICartsAll);
    
    const userCart: Cart | null = carts?.find(c => c.userId === user?.id) ?? null;
    
    const handeUserIconClicked = () => setUserDialogueActive(prev => !prev);
    const handleShoppingCartClicked = () => setShoppingCartActive(prev => !prev);
    
    // Wrapper component that highlights child icon when clicked. HighlightOn: boolean to listen to, highlights when true. Pass false if icon should never highlight
    const HoverableIconWrapper: React.FC<{ children: ReactNode, highlightOn: boolean, onClick?: () => void }> = ({ children, highlightOn, onClick }) => {
        return(
            <div 
            className={`cursor-pointer hover:bg-gray-600 w-8 h-8 relative flex items-center justify-center rounded-full ${highlightOn && "bg-gray-600"}`}
            onClick={onClick}>
                {children}
            </div>
        )
    }
    
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
    
    // The user's first name that appears besides the user icon when logged in
    const UserIconName: React.FC<{name: string | null}> = ({ name }) => {
        if (!name) return null;
        return (
            <span className={`
                absolute
                -right-4
                top-3
                w-3 h-3
                text-white
                text-[12px]
                underline
                font-bold
                flex items-center justify-center
                pointer-events-none
                `}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
        )
    }

    const MobileNavbar: React.FC = () => {
        return (
            <>
                <div className="h-[60px] w-full px-6 flex flex-row justify-between items-center text-gray-200 bg-gray-800">
                    <div className="flex flex-row items-center gap-5">
                        <Link className="text-yellow-300 text-2xl font-bold italic" to="/">Forgers™</Link>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <HoverableIconWrapper highlightOn={shoppingCartActive} onClick={handleShoppingCartClicked}>
                            <IoCartOutline className="cursor-pointer" size={28} />                        
                            <CartNumberedCircle number={userCart ? userCart.products.length : 0}/>
                        </HoverableIconWrapper>
                        <HoverableIconWrapper highlightOn={userDialogueActive} onClick={handeUserIconClicked}>
                            <FaRegUser size={23}/>
                            <UserIconName name={user && user.name.firstname}/>
                        </HoverableIconWrapper>
                    </div>
                </div>
                <hr className="h-0.5 bg-yellow-300"/>
                {userDialogueActive && 
                <div className="absolute right-14">
                    <LoginRegister onClickOutside={() => setUserDialogueActive(false)} />
                </div> }
                {shoppingCartActive && 
                <div className="absolute right-28 w-[20%]">
                    <ProductCardList cart={userCart ?? null} onClickOutside={() => setShoppingCartActive(false)} />
                </div>}
            </>
        )
    }

    const DesktopNavbar: React.FC = () => {
        return (
            <>
                <nav className="h-[50px] w-full px-10 flex flex-row justify-between items-center text-gray-200 bg-gray-800">
                    <Link className="text-yellow-300 text-2xl font-bold italic" to="/">Forgers™</Link>
                    <div className="flex flex-row gap-8 items-center">
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="/" end>Store</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="*" end>Exclusive deals</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="*" end>About</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'}`} to="*" end>Contact</NavLink>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <HoverableIconWrapper highlightOn={shoppingCartActive} onClick={handleShoppingCartClicked}>
                            <IoCartOutline className="cursor-pointer" size={22} />                        
                            <CartNumberedCircle number={userCart ? userCart.products.length : 0}/>
                        </HoverableIconWrapper>
                        <HoverableIconWrapper highlightOn={userDialogueActive} onClick={handeUserIconClicked}>
                            <FaRegUser size={18}/>
                            <UserIconName name={user && user.name.firstname}/>
                        </HoverableIconWrapper>
                    </div>
                </nav>
                {userDialogueActive && 
                <div className="absolute right-14">
                    <LoginRegister onClickOutside={() => setUserDialogueActive(false)} />
                </div> }
                {shoppingCartActive && 
                <div className="absolute right-28 w-[20%]">
                    <ProductCardList cart={userCart ?? null} onClickOutside={() => setShoppingCartActive(false)} />
                </div>}
            </>
        )
    }
    
    return (
        <IconContext.Provider value={{ color: "white" }}>
            <div className="md:hidden block">
                <MobileNavbar />
            </div>
            <div className="hidden md:block">
                <DesktopNavbar />
            </div>
        </IconContext.Provider>
    )
};

export default Navbar;
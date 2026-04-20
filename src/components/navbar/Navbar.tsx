import { useState, type ReactNode } from "react";
import { IconContext } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import LoginRegister from "../../auth/components/LoginRegister";

const Navbar: React.FC = () => {
    const [userDialogueActive, setUserDialogueActive] = useState(false);
    const handeUserIconClicked = () => setUserDialogueActive(prev => !prev);

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
            <nav className="h-[50px] px-20 flex flex-row justify-between items-center bg-gray-800">
                <div className="text-yellow-300 text-2xl font-bold italic">
                    <a href="/">Forgers™</a>
                </div>
                <div className="flex flex-row gap-10 items-center">
                    <ul className="flex flex-cols gap-8 text-gray-200">
                        <li className="hover:underline"><a href="*">Store</a></li>
                        <li className="hover:underline"><a href="*">Exclusive deals</a></li>
                        <li className="hover:underline"><a href="*">About</a></li>
                        <li className="hover:underline"><a href="*">Contact</a></li>
                    </ul>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <HoverableIconWrapper highlightOn={false}>
                        <IoCartOutline className="cursor-pointer" size={22} />                        
                        <CartNumberedCircle number={200}/>
                    </HoverableIconWrapper>
                    <HoverableIconWrapper highlightOn={userDialogueActive} onClick={handeUserIconClicked}>
                        <FaRegUser size={18}/>
                    </HoverableIconWrapper>
                </div>
            </nav>
            {userDialogueActive && 
            <div className="absolute right-14">
                <LoginRegister onClickOutside={() => setUserDialogueActive(false)}/>
            </div> }
        </IconContext.Provider>
    )
};

export default Navbar;
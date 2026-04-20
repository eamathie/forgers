import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import LoginRegister from "../../auth/components/LoginRegister";

const Navbar: React.FC = () => {
    const [userDialogueActive, setUserDialogueActive] = useState(false);
    const handeUserIconClicked = () => setUserDialogueActive(!userDialogueActive);

    useEffect(() => {
        console.log(userDialogueActive);
    }, [userDialogueActive])

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
                <div className="flex flex-row items-center gap-3">
                    <IoCartOutline className="cursor-pointer" size={22} />
                    <div className={`cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center rounded-[50%] ${userDialogueActive && "bg-gray-500"}`}>
                        <FaRegUser size={18} onClick={handeUserIconClicked} />
                    </div >
                </div>
            </nav>
            {userDialogueActive && 
            <div className="absolute right-14">
                <LoginRegister  />
            </div> }
        </IconContext.Provider>
    )
};

export default Navbar;
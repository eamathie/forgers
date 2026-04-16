import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { IconContext } from "react-icons";

const Navbar: React.FC = () => {
    return (
        <IconContext.Provider value={{ color: "white" }}>
            <nav className="w-screen h-[50px] px-14 flex flex-row justify-between items-center gap-5 bg-gray-800">
                <div className="flex flex-row gap-5 items-center text-yellow-300 text-2xl font-bold italic">
                    <RxHamburgerMenu />
                    <a href="/">Forgers™</a>
                </div>
                <div className="flex flex-row gap-10 items-center">
                    <ul className="flex flex-cols gap-8 text-gray-200">
                        <li><a href="*">Store</a></li>
                        <li><a href="*">Exclusive deals</a></li>
                        <li><a href="*">About</a></li>
                        <li><a href="*">Contact</a></li>
                    </ul>
                    <FaRegUser />
                </div>
            </nav>
        </IconContext.Provider>
    )
};

export default Navbar;
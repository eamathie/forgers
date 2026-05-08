import { NavLink } from "react-router";

const NavigationLinks = () => {
    return (
        <nav className="flex flex-col gap-1 items-stretch md:flex-row md:gap-5 md:items-center">
            <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 md:bg-transparent rounded-md px-2 py-1.5`} to="/" end>Store</NavLink>
            <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 md:bg-transparent rounded-md px-2 py-1.5`} to="*" end>Exclusive deals</NavLink>
            <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 md:bg-transparent rounded-md px-2 py-1.5`} to="/about" end>About</NavLink>
            <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 md:bg-transparent rounded-md px-2 py-1.5`} to="/contact" end>Contact</NavLink>
        </nav>
    );
};

export default NavigationLinks;
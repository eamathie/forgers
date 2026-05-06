import { Outlet } from "react-router";
import Navbar from "./components/navbar/Navbar";

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout;
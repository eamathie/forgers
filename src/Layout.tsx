import { Outlet } from "react-router";
import Navbar from "./components/navbar/Navbar";
import MobileSidebar from "./components/navbar/MobileSidebar";
import { useSidebar } from "./components/navbar/SidebarContext";

const Layout = () => {
    const { content } = useSidebar();
    return (
            <div className="flex flex-col h-screen">
                <Navbar />
                <div className="relative flex-1 min-h-0 flex flex-col">
                    <div className="md:hidden">
                        <MobileSidebar nameChildrenNodesPairs={content}/>
                    </div>
                    <Outlet />
                </div>
            </div>
    )
}

export default Layout;
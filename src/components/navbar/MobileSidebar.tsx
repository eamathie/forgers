import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import ChevronCircle from "./ChevronCircle";

interface MobileSidebarProps {
    nameChildrenNodesPairs?: NameChildrenNodesPair[];
}

interface NameChildrenNodesPair {
    name: string;
    children: ReactNode
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ nameChildrenNodesPairs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // this little work-around makes the sidebar ease-in-out work
    useEffect(() => {
        setMounted(true);
    }, [])
    
    return (
        <div className={`duration-300 ease-in-out ${mounted && isOpen ? 'translate-x-0' : '-translate-x-full'} absolute h-full w-[45%] md:w-[25%] text-lg md:text-sm text-gray-200 bg-gray-800 z-20`}>
            <div className="flex flex-col gap-8 p-6 h-full overflow-y-auto">
                <div className="flex flex-col gap-3">
                    <div>
                        <h2>Explore</h2>
                        <hr className="bg-gray-200"/>
                    </div>
                    <div className="flex flex-col gap-1 items-stretch">
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 rounded-md px-2 py-1`} to="/" end>Store</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 rounded-md px-2 py-1`} to="*" end>Exclusive deals</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 rounded-md px-2 py-1`} to="*" end>About</NavLink>
                        <NavLink className={({ isActive }) => `hover:underline ${isActive && 'underline'} bg-gray-600 rounded-md px-2 py-1`} to="*" end>Contact</NavLink>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {nameChildrenNodesPairs?.map(e => 
                        <div key={e.name} className="flex flex-col gap-3">
                            <div>
                                <h2>{e.name}</h2>
                                <hr className="bg-gray-200"/>
                            </div>
                            <div className="flex flex-col gap-1 items-stretch">
                                {e.children}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ChevronCircle 
                isOpen={isOpen} 
                onClick={() => setIsOpen(prev => !prev)}
            />
        </div>      
    )
}

export default MobileSidebar;
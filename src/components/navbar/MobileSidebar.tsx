import { useEffect, useState, type ReactNode } from "react";
import ChevronCircle from "./ChevronCircle";
import NavigationLinks from "./NavigationLinks";

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
        <div className={`absolute inset-y-0 left-0 w-[50%] bg-gray-800 text-gray-200 z-20 transform duration-300 ease-in-out ${mounted && isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full min-h-0 overflow-y-auto p-6 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <div>
                        <h2>Explore</h2>
                        <hr className="bg-gray-200"/>
                    </div>
                    <NavigationLinks />
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
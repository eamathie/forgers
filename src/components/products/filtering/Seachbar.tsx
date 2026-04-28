interface SearchBarProps {
    onChange: (value: string) => void
};

const Searchbar: React.FC<SearchBarProps> = ({ onChange }) => {
    return (
        <>
        <div className="hidden md:block">
            <div className="h-16 md:h-1/2 flex flex-col">
                <label htmlFor="searchBar">Search: </label>
                <hr className="h-0.5 bg-gray-200"/>
                <input 
                className="border-2 rounded-lg px-2 my-1"
                id="searchBar"
                name="seachBar"
                placeholder="search..."
                onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
        <div className="block md:hidden">
            <div className="h-full md:h-1/2 flex flex-col">
                <label htmlFor="searchBar" className="text-lg">Search: </label>
                <hr className="h-0.5 bg-gray-200"/>
                <input 
                className="h-[40px] border-2 rounded-lg px-2 my-1"
                id="searchBar"
                name="seachBar"
                placeholder="search..."
                onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
        </>
    )
};

export default Searchbar;
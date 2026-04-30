interface SearchBarProps {
    onChange: (value: string) => void
};

const Searchbar: React.FC<SearchBarProps> = ({ onChange }) => {
    return (
        <div className="h-full md:h-16 flex flex-col">
            <label htmlFor="searchBar" className="text-lg md:text-base">Search: </label>
            <hr className="h-0.5 bg-gray-200"/>
            <input 
            className="h-[40px] border-2 rounded-lg px-2 my-1"
            id="searchBar"
            name="seachBar"
            placeholder="search..."
            onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
};

export default Searchbar;
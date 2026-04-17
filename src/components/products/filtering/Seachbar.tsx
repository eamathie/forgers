interface SearchBarProps {
    onChange: (value: string) => void
};

const Searchbar: React.FC<SearchBarProps> = ({ onChange }) => {
    return (
        <div className="h-1/2 flex flex-col">
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
    )
};

export default Searchbar;
interface SearchBarProps {
    onChange: (value: string) => void
};

const Searchbar: React.FC<SearchBarProps> = ({ onChange }) => {
    return (
        <input 
        className="h-1/2 border-2 rounded-lg px-2"
        name="seachBar"
        placeholder="search..."
        onChange={(e) => onChange(e.target.value)}
        />
    )
};

export default Searchbar;
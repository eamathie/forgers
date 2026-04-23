interface RadioButtonListCardProps {
    options: string[];
    selected: string | null;
    onSelect: (option: string) => void;
}

const RadioButtonListCard: React.FC<RadioButtonListCardProps> = ({ options, selected, onSelect }) => {
    if (options.length === 0) return null;
    return (
        <div className="border-2 rounded-lg px-2 my-1">
            {options.map((o) => 
                <div key={o} className="flex flex-row gap-2">
                    <input 
                        type="radio"
                        name="sort-option"  
                        id={o}
                        checked={selected === o}
                        onChange={() => onSelect(o)}
                    />
                    <label htmlFor={o}>{o}</label>
                </div>
            )}
        </div>
    )
}

export default RadioButtonListCard;
interface RadioButtonListCardProps {
    options: string[];
    onSelect: (option: string) => void;
}

const RadioButtonListCard: React.FC<RadioButtonListCardProps> = ({ options, onSelect }) => {
    return (
        <div className="border-2 rounded-lg px-2 my-1">
            {options.map((o) => 
                <div key={`title-${o}`} className="flex flex-row gap-2">
                    <input name={o} type="radio" onChange={() => onSelect(o)}/>
                    <label htmlFor={o}>{o}</label>
                </div>
            )}
        </div>
    )
}

export default RadioButtonListCard;
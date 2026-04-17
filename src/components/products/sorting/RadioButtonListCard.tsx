interface RadioButtonListCardProps {
    title: string;
    options: string[];
    onSelect: ((title: string, option: string) => void)
}

const RadioButtonListCard: React.FC<RadioButtonListCardProps> = ({ title, options, onSelect }) => {
    return (
        <div className="border-2 rounded-lg px-2 my-1">
            <label htmlFor={title}>{title}</label>
            <hr className="h-0.5 bg-gray-200"/>
            <div id={title}>
                {options.map((o) => 
                    <div key={`title-${o}`} className="flex flex-row gap-2">
                        <input name={title} type="radio" onChange={() => onSelect(title, o)}/>
                        <label htmlFor={o}>{o}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RadioButtonListCard;
interface RadioButtonListCardProps {
    title: string;
    options: string[];
}

const RadioButtonListCard: React.FC<RadioButtonListCardProps> = ({ title, options }) => {
    return (
        <div className="border-2 rounded-lg px-2 my-1">
            <label htmlFor={title}>{title}</label>
            <hr className="h-0.5 bg-gray-200"/>
            <div id={title}>
                {options.map((o) => 
                    <div key={`title-${o}`} className="flex flex-row gap-2">
                        <input  
                        name={o}
                        type="radio"
                        >
                        </input>
                        <label htmlFor={o}>{o}</label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RadioButtonListCard;
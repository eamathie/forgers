interface TextFieldProps {
    name: string;
    type: React.HTMLInputTypeAttribute;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField: React.FC<TextFieldProps> = ({ name, type, onChange }) => {
    return (
        <div className="h-1/2 flex flex-col">
            <label htmlFor="searchBar">{name}: </label>
            <hr className="h-0.5 bg-gray-200"/>
            <input 
            className="border-2 rounded-lg px-2 my-1"
            id="searchBar"
            name={name}
            type={type}
            placeholder={`${name}...`}
            onChange={onChange}
            />
        </div>
    )
};

export default TextField;
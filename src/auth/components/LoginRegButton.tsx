interface LoginRegButtonProps {
    name: string;
    onClick: () => void;
}

const LoginRegButton = ({ name, onClick }: LoginRegButtonProps) => {
    return (
        <button 
        className="bg-yellow-300 rounded-lg outline outline-yellow-500 shadow-md p-1"
        onClick={onClick}>
            {name}    
        </button>
    )
}

export default LoginRegButton;
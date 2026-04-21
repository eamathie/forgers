import { useEffect, useState, useRef } from "react";
import { URIUsersAll } from "../../utils/fake_store_api/Users";
import { useFetch } from "../../utils/useFetch";
import type { LoginResponse, AuthRequest, User } from "../types";
import TextField from "./TextField";
import LoginRegButton from "./LoginRegButton";
import { post } from "../../utils/post";
import { URILogin } from "../../utils/fake_store_api/Auth";
import { useAuth } from "../useAuth";

interface LoginRegisterProp {
    onClickOutside: () => void;
}

const LoginRegister: React.FC<LoginRegisterProp> = ({ onClickOutside }) => {
    const {data: users, loading, error } = useFetch<User[]>(URIUsersAll);
    const [userInput, setUserInput] = useState<AuthRequest>({username: "", password: ""})
    const [authError, setAuthError] = useState(false);
    const { user, updateUser } = useAuth();
    const ref = useRef<HTMLDivElement | null>(null);

    const handleTextFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name.toLowerCase()]: value,
        }));
    };    

    const handleRegister = () => {
        console.log("register");
    }

    const handleLogin = async () => {
        try {
            const result = await post<LoginResponse, AuthRequest>(URILogin, userInput); // token (looks like a JWT) is not actually necessary for the fake API, but here it is
            console.log(result.token);
            setAuthError(false);
            const currentUser = users?.find(u => u.username === userInput.username);
            updateUser(currentUser ?? null);       
        } catch (error) {
            console.error("Login failed", error);
            setAuthError(true);
        }        
    };

    const handleLogout = () => updateUser(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            };
        };
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [onClickOutside]);
    
    return (
        <div ref={ref} className="flex flex-col gap-1 bg-white z-0 rounded-lg outline outline outline-yellow-500 shadow-lg text-xs text-left p-3">
            {!user ?
            <div>
                <TextField name="Username" type="text" onChange={handleTextFieldChanged}/>
                <TextField name="Password" type="password" onChange={handleTextFieldChanged}/>
                {authError && <h2 className="text-red-500 font-bold">Error. Check your credentials</h2>}
                <div className="flex flex-row gap-2">
                    <LoginRegButton name="Register" onClick={handleRegister}/>
                    <LoginRegButton name="Login" onClick={handleLogin}/>
                </div>
            </div> :
            <div className="flex flex-col gap-1">
                <h2 className="font-bold">Hello, {user.name.firstname}!</h2>
                <LoginRegButton name="Logout" onClick={handleLogout}/>
            </div>
            }
        </div>
    )
}

export default LoginRegister;
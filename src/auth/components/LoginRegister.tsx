import { useEffect, useState } from "react";
import { URIUsersAll } from "../../utils/fake_store_api/Users";
import { useFetch } from "../../utils/useFetch";
import type { AuthInput, User } from "../types";
import TextField from "./TextField";
import LoginRegButton from "./LoginRegButton";


const LoginRegister: React.FC = () => {
    const {data: users, loading, error } = useFetch<User[]>(URIUsersAll);
    const [userInput, setUserInput] = useState<AuthInput>({username: "", password: ""})

    const handleTextFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name.toLowerCase()]: value,
        }))
    };    

    const handleRegister = () => {
        console.log("register");
    }

    const handleLogin = () => {
        console.log("login");
    }

    useEffect(() => {
        console.log(users);
    }, [users]);

    useEffect(() => {
        console.log(userInput);
    }, [userInput]);

    return (
        <div className="flex flex-col gap-1 bg-white z-0 rounded-lg outline outline outline-yellow-500 shadow-lg text-xs text-left p-3">
            <TextField name="Username" type="text" onChange={handleTextFieldChanged}/>
            <TextField name="Password" type="password" onChange={handleTextFieldChanged}/>
            <div className="flex flex-row gap-2">
                <LoginRegButton name="Register" onClick={handleRegister}/>
                <LoginRegButton name="Login" onClick={handleLogin}/>
            </div>
        </div>
    )
}

export default LoginRegister;
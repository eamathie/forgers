import { useEffect, useState } from "react";
import { URIUsersAll } from "../../utils/fake_store_api/Users";
import { useFetch } from "../../utils/useFetch";
import type { AuthInput, User } from "../types";
import TextField from "./TextField";


const LoginRegister: React.FC = () => {
    const {data: users, loading, error } = useFetch<User[]>(URIUsersAll);
    const [userInput, setUserInput] = useState<AuthInput>({username: "", password: ""})

    const handleTextFieldChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: value,
        }))
    };
    

    useEffect(() => {
        console.log(users);
    }, [users]);

    useEffect(() => {
        console.log(userInput);
    }, [userInput]);

    return (
        <div className="bg-white z-0 rounded-lg outline outline-gray-200 shadow-lg text-xs text-left p-3">
            <TextField name="Username" type="text" onChange={handleTextFieldChanged}/>
            <TextField name="Password" type="password" onChange={handleTextFieldChanged}/>
        </div>
    )
}

export default LoginRegister;
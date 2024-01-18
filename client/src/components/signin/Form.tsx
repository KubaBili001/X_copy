import React, { ReactElement, useState } from "react";
import ApiResponse from '../../models/ApiResponse'
import { useNavigate } from 'react-router-dom';
import Input from "../input_field/Input";
import './Form.css'
import Cookies from 'js-cookie';

export default function Form(): ReactElement{
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate();

    const validate = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        fetch('http://localhost:3001/signin', requestOptions)
            .then(response => response.json())
            .then(data => process(data))
    }

    const process = (data: ApiResponse) => {
        if (!data.success)
        {
            alert(data.message)
        } 
        else 
        {
            Cookies.set('token', data.token, { expires: 1, secure: false });
            Cookies.set('userid', data.id, { expires: 1, secure: false });           

            navigate("/app")
        }
    }

    return (
        <div className="elements">
            <Input 
            label="Username"
            value={username}
            setValue={setUsername} 
            />
            <Input 
            label="Password"
            value={password}
            setValue={setPassword} 
            type="password"
            />
            <button className="button" onClick={validate}>Login</button>
        </div>
    )
}
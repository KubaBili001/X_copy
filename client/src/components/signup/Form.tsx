import React, { ReactElement, useEffect, useState } from "react";
import Input from "../input_field/Input";
import ApiResponse from "../../models/ApiResponse";
import { useNavigate } from "react-router";

export default function Register(): ReactElement {
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [date, setDate] = useState<string>('')

    const navigate = useNavigate()

    const validate = () => {
        //Add password and email validation !!!
        send()
    }

    useEffect(() => {
        console.log(date)
    }, [date])

    const send = () => {        
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                date: date
            })
        };
        fetch('http://localhost:3001/signup', requestOptions)
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
            navigate("/")
        }
    }

    return (
        <div className="elements">
            <Input 
            label="Name"
            value={name}
            setValue={setName} 
            />
            <Input 
            label="Last name"
            value={lastName}
            setValue={setLastName} 
            />
            <Input 
            label="Email"
            value={email}
            setValue={setEmail} 
            />
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
            <Input 
            label=""
            value={date}
            setValue={setDate} 
            type="date"
            />
            <button className="button" onClick={validate} >Register</button>
        </div>
    )
}
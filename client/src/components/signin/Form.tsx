import React, { ReactElement, useState } from "react";
import './Form.css'

export default function Form(): ReactElement{
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
            .then(data => alert(data.token))
    }

    
    return(
        <div className="elements">
            <div className="input_container">
                <input type="text" id="login_input" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                <label htmlFor="login_input" className="label">Username</label>
                <div className="line"></div>
            </div>
            <div className="input_container">
                <input type="password" id="password_input" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <label htmlFor="password_input" className="label">Password</label>
                <div className="line"></div>
            </div>
            <button className="button" onClick={validate}>Login</button>
        </div>
    )
}
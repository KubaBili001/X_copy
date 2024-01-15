import React, { ReactElement, useState } from "react";

export default function Register(): ReactElement {
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [date, setDate] = useState<string>()

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
            .then(data => console.log(data))
    }

    return (
        <div className="elements">
            <div className="input_container">
                <input type="text" id="name_input" name="name" value={name} onChange={e => setName(e.target.value)} autoComplete="false" required />
                <label htmlFor="name_input" className="label">First name</label>
                <div className="line"></div>
            </div>
            <div className="input_container">
                <input type="text" id="last_name_input" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} autoComplete="false" required />
                <label htmlFor="last_name_input" className="label">Last Name</label>
                <div className="line"></div>
            </div>
            <div className="input_container">
                <input type="email" id="email_input" name="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="false" required />
                <label htmlFor="email_input" className="label">Email</label>
                <div className="line"></div>
            </div>
            <div className="input_container">
                <input type="text" id="username_input" name="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="false" required />
                <label htmlFor="username_input" className="label">Username</label>
                <div className="line"></div>
            </div>
            <div className="input_container">
                <input type="password" id="password_input" name="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="false" required />
                <label htmlFor="password_input" className="label">Password</label>
                <div className="line"></div>
            </div>
            <div className="input_container">
                <input type="date" id="input" name="date" value={date} onChange={e => setDate(e.target.value)} autoComplete="false" required />
                <div className="line"></div>
            </div>
            <button className="button" onClick={validate} >Register</button>
        </div>
    )
}
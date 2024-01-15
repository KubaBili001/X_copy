import React from "react";

export default function Input ( {value , setValue} : {value: string, setValue: Function}) {
    return (
        <div className="input_container">
                <input type="text" id="login_input" name={value} value={value} onChange={e => setValue(e.target.value)} required/>
                <label htmlFor="login_input" className="label">Username</label>
                <div className="line"></div>
            </div>
    )
}
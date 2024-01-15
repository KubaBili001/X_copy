import React, { ReactElement, useState } from "react";
import Form from "../signup/Form";
import './Register.css'

export default function Register(): ReactElement {
    return (
        <div className="container">
            <div className="content">
                <div className="login_box">
                    <img className="logo" src="logo.png" alt="background image" />
                    <Form />
                </div>
                <div className="link_box">
                    <h1 className="register underline">Go back</h1>
                </div>
            </div>
        </div>
    )
}
import React, { ReactElement } from "react";
import Form from './Form'
import './Login.css'

export default function Login(): ReactElement {
    return(
        <div className="container">
            <div className="content">
                <div className="login_box">
                    <img className="logo" src={require("../../images/logo.png")} alt="logo"/>
                    <Form />
                </div>
                <div className="link_box">
                    <h1 className="register">Don't have an account? <span className="underline">Sign up</span></h1>
                    <h1 className="register underline">Can't log in?</h1>
                </div>
            </div>
        </div>
    )
}
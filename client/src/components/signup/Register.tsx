import React, { ReactElement } from "react";
import Form from "../signup/Form";
import { Link } from "react-router-dom";
import './Register.css'

export default function Register(): ReactElement {
    return (
        <div className="container">
            <div className="content">
                <div className="login_box">
                    <img className="logo" src={require("../../images/logo.png")} alt="background image" />
                    <Form />
                </div>
                <div className="link_box">
                    <h1 className="register underline"><Link to="/"> Go back </Link></h1>
                </div>
            </div>
        </div>
    )
}
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Form from './Form'
import './Login.css'

export default function Login(): ReactElement {

    const StyledLink = styled(Link)`
    text-decoration: none;
    `;

    return(
        <div className="container">
            <div className="content">
                <div className="login_box">
                    <img className="logo" src={require("../../images/logo.png")} alt="logo"/>
                    <Form />
                </div>
                <div className="link_box">
                    <h1 className="register">Don't have an account? <span className="underline"> <Link to="/signup"> Sign up </Link></span></h1>
                    <h1 className="register underline">Can't log in?</h1>
                </div>
            </div>
        </div>
    )
}
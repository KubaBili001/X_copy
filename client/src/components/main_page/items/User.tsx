import { ReactElement } from "react";

export default function User (): ReactElement{
    return (
        <div className="user">
            <img className="profile_pic" src="profile_pic.png" alt="profile picture"/>
            <p className="username">Jarek</p>
        </div>
    )
}
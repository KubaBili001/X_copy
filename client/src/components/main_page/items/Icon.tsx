import { ReactElement } from "react";

export default function Icon (): ReactElement {
    return(
        <a className="icon_container" href="">
            <img className="icon" src="profile.png" alt="profile"/>
            <h1 className="icon_text">Profile</h1>
        </a>
    )
}
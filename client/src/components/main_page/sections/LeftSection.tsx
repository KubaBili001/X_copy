import { ReactElement } from "react";
import Icon from "../items/Icon";
import Profile from '../../../images/profile.png'
import Home from '../../../images/home.png'
import Followers from '../../../images/following.png'
import LogOut from '../../../images/log out.png'
import Logo from '../../../images/logow.png'

export default function LeftSection (): ReactElement {
    return (
        <div className="inner_left">
            <div className="left_menu">
                <img className="feed_logo" src={Logo} alt="logo"/>
                <div className="icons">
                    <div className="icon_wrapper">
                        <Icon
                        text="Profile"
                        image={Profile} 
                        />
                        <Icon
                        text="Home"
                        image={Home}
                        />
                        <Icon
                        text="Follows"
                        image={Followers}
                        />
                    </div>
                    <Icon
                    text="Log out"
                    image={LogOut}
                    />
                </div>
            </div>
            <button className="add_post">ADD POST</button>
        </div>
    )
}
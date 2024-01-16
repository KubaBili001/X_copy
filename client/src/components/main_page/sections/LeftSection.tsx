import { ReactElement } from "react";
import Icon from "../items/Icon";

export default function LeftSection (): ReactElement {
    return (
        <div className="inner_left">
            <div className="left_menu">
                <img className="logo" src={require("../../images/logow.png")} alt="logo"/>
                <div className="icons">
                    <div className="icon_wrapper">
                        <Icon />
                        <Icon />
                        <Icon />
                    </div>
                    <Icon />
                </div>
            </div>
            <button className="add_post">ADD POST</button>
        </div>
    )
}
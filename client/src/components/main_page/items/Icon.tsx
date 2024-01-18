import { ReactElement } from "react";

export default function Icon ({ text, image } : { text: string, image: string }): ReactElement {
    return(
        <button className="icon_container">
            <img className="icon" src={image} alt={text}/>
            <h1 className="icon_text">{text}</h1>
        </ button>
    )
}
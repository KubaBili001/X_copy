import { ReactElement } from "react";
import './Popup.css'

export default function Popup ({ handleClose, content} : { handleClose: Function, content: ReactElement}) {

    return (
        <div className="popup-container">
            <div className="popup-box">
                <button className="btn-close" onClick={() => { handleClose() }}>x</button>     
                {content}
            </div>
        </div>
    )
} 
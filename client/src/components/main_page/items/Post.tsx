import { ReactElement, useState } from "react";
import Popup from "./popup/Popup";
import ProfilePic from '../../../images/profile_pic.png'
import Comments from "./comments/Comments";

export default function Post ( {username, content, image} : {username: string, content: string, image: string} ): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <div className="post">
            <div className="post_profile post-width">
                <img className="profile_pic" src={ProfilePic} alt="profile picture"/>
                <p className="username">{username}</p>
                <button className="follow">follow</button>
            </div>
            <div className="post_content post-width">
                <div className="post_txt">
                    <p>{content}</p>
                </div>
                <div className="post_img ">
                    <img className="post_picture" src={image} alt="picture"/>
                </div>
                <div className="post_comments">
                    <button className="comments_button" onClick={() => { setIsOpen(true) }}>
                        <h1 className="comments">See all comments</h1>  
                    </button>
                    {
                    isOpen && <Popup 
                        handleClose={handleClose}
                        content={<Comments/>}
                    />
                    }
                </div>
            </div>
        </div>
    )
}
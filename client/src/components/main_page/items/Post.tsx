import { ReactElement } from "react";

export default function Post (): ReactElement {
    return (
        <div className="post">
            <div className="post_profile">
                <img className="profile_pic" src="profile_pic.png" alt="profile picture"/>
                <p className="username">KubaBili001</p>
                <button className="follow">follow</button>
            </div>
            <div className="post_content">
                <div className="post_txt">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium temporibus ab ipsa provident nostrum eius reiciendis ducimus inventore rerum quod!</p>
                </div>
                <div className="post_img">
                    <img className="post_picture" src="pic1.jpg" alt="picture"/>
                </div>
                <div className="post_comments">
                    <h1 className="comments">See all comments</h1>
                    <img className="like" src="heart.png" alt="like"/>
                </div>
            </div>
        </div>
    )
}
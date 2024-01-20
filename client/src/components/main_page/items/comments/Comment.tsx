import { useState, useRef, useEffect, ReactElement } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "./svgs/down-arrow.svg";
import { ReactComponent as UpArrow } from "./svgs/up-arrow.svg";
import Comm from "./models/Comm";

export default function Comment ({ handleInsertNode, comment } : { handleInsertNode: Function, comment: Comm }) {
    const [input, setInput] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false);
    const [expand, setExpand] = useState(false);

    const handleNewComment = () => {
        setExpand(!expand);
        setShowInput(true);
      };

      const onAddComment = () => {
          setExpand(true);
          handleInsertNode(comment.id, input);
          setShowInput(false);
          setInput("");
      };

    return (
        <div>
            <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
            {comment.id === 1 ? (
                <>
                    <input
                        type="text"
                        className="inputContainer__input first_input"
                        autoFocus
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="..."
                    />
                    <Action 
                        className="reply comment"
                        type="COMMENT"
                        handleClick={onAddComment}
                    />    
                </>
            ) : (
                <>
                    <span style={{ wordWrap: "break-word" }}>{comment.content}</span>

                    <div style={{ display: 'flex', marginTop: '5px' }}>
                    <Action
                    className="reply"
                    type=
                        {
                        <>
                            {expand ? (
                            <UpArrow width="10px" height="10px" />
                            ) : (
                            <DownArrow width="10px" height="10px" />
                            )}{" "}
                            REPLY
                        </>
                        }
                    handleClick={handleNewComment}
                    />
                    </div>
                </>
            )}
            </div>
            <div style={{ paddingLeft: 10 }}>
            {showInput && (
            <div className="inputContainer">
                <input
                    type="text"
                    className="inputContainer__input"
                    autoFocus
                    onChange={(e) => setInput(e.target.value)}
                />
                <Action className="reply" type="REPLY" handleClick={onAddComment} />
                <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                        setShowInput(false);
                        if (!comment?.items?.length) setExpand(false);
                    }}
                />
            </div>
            )}

                {comment?.items?.map((cmnt) => {
                    return <Comment key={cmnt.id} comment={cmnt} handleInsertNode={handleInsertNode}/>
                })}
            </div>
        </div>
    )
}
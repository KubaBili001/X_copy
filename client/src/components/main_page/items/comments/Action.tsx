import React from "react";

export default function Action ({ handleClick, type, className } : {handleClick: Function, type : any, className: string }) {
    return (
        <div className={className} onClick={() => handleClick()}>
            {type}
        </div>
    )
}
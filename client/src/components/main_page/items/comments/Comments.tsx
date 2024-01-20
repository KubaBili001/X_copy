import { useState } from "react"
import Comment from "./Comment"
import Comm from "./models/Comm";
import useNode from "./hooks/useNode";
import './Comments.css'

const comments : Comm = {
    id: 1,
    items: [
        {
            //it also has to contain username
            id: 2,
            content: 'hello',
            items: [
                {
                    id: 5,
                    content: 'abrakadabra',
                    items: [{
                        id: 4,
                        content: 'abrakadabra',
                        items: []
                    }]
                },
                {
                    id: 6,
                    content: 'abrakadabra',
                    items: []
                }
            ]
        },
        {
            id: 7,
            content: 'helloasdasd',
            items: [
                {
                    id: 3,
                    content: 'abrakadabra',
                    items: []
                }
            ]
        }
    ]
}

export default function Comments () {
    const [commentsData, setCommentsData] = useState<Comm>(comments);

    const { insertNode } = useNode();

    const handleInsertNode = (commentId: any, content: any) => {
        console.log(commentsData)
        const finalStructure = insertNode(commentsData, commentId, content);
        setCommentsData(finalStructure);
    };

    return (
        <Comment
            handleInsertNode={handleInsertNode}
            comment={commentsData}
        />
    )
}
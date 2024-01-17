import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../items/Post";
import { ReactElement, useEffect, useState } from "react";
import PostObj from "../../../models/PostObj";

export default function CenterSection (): ReactElement {
    const [posts, setPosts] = useState<PostObj[]>([])
    const [itemCount, setItemCount] = useState<number>(0)

    useEffect(() => {
        
    }, [])

    const loadPosts = () => {
        
    }

    return (
        <div className="inner_center">
            <InfiniteScroll 
            dataLength={10}
            next={loadPosts}
            hasMore={true}
            loader={undefined} 
            > 
                {
                    posts.map((post: PostObj, index: number) => {
                        return (
                            <Post />
                        )
                    })
                }
            </ InfiniteScroll>

        </div>
    )
}
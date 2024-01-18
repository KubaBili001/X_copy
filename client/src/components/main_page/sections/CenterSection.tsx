import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../items/Post";
import { ReactElement, useEffect, useState } from "react";
import PostObj from "../../../models/PostObj";
import Cookies from 'js-cookie';

export default function CenterSection (): ReactElement {
    const [posts, setPosts] = useState<PostObj[]>([])
    const [itemCount, setItemCount] = useState<number>(10)
    const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: Cookies.get('userid'),
            skip: itemCount
        })
    };

    useEffect(() => {
        fetch('http://localhost:3001/posts', requestOptions)
            .then(response => response.json())
            .then(data => { setPosts(data) })
    }, [])

    const loadPosts = () => {
        const newVal: number = itemCount + 10
        setItemCount(newVal)
        fetch('http://localhost:3001/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (!data.length)
                    setHasLoaded(true)
                else 
                    setPosts([...posts, ...data]) 
            })
    }
    
    return (
        <div id='inner_center' className='inner_center'>
            <InfiniteScroll 
                dataLength={posts.length}
                next={loadPosts}
                hasMore={!hasLoaded}
                loader={<div className="loader-container"><div className="custom-loader"></div></div>}
                endMessage={
                    <p style={{textAlign:'center', color:'white'}}><b>No more posts to show.</b></p>
                }
                scrollableTarget='inner_center'
            > 
                {
                    posts.map((post: PostObj, index: number) => {
                        return (
                            <Post
                            key={index}
                            username={post.username}
                            content={post.content} 
                            image={post.image}
                            />
                        )
                    })
                }
            </ InfiniteScroll>
        </div>
    )
}
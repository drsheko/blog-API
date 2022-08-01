import { useState ,useEffect } from "react"
import PostCard from "./postCard";
const Posts = ({getPosts}) => {
    const [posts , setPosts] = useState() ;
    const fetchPosts =async()=>{
        
        var url ="https://pixabay.com/api/?key=27818144-b35666e63fd37e75787508770&q=cars&image_type=photo"
       var res = await fetch("http://localhost:3001/api/posts"  , {mode:'cors'})
        var data = await res.json();
        setPosts(data)
        getPosts(data)
    }

useEffect(()=>{fetchPosts()},[])

    return(<>
                {posts.map(post =>{
                    <PostCard 
                        postTime = {post.timestamp}
                        postId = {post._id}
                        postTitle = {post.title}
                    
                    />

                })}
            </>)
    
}
export default Posts ;
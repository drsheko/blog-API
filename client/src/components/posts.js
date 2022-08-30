import { useState ,useEffect } from "react"
import PostCard from "./postCard";

const Posts = ({getPosts}) => {
    const [posts , setPosts] = useState(null) ;
    const [isLoading , setIsLoading] = useState(true);
   
    useEffect(()=>{
        const fetchPosts =async()=>{
            try {
                var res = await fetch("http://localhost:3001/api/posts"  , {mode:'cors'})
                var data = await res.json();
                 setPosts( await data.posts);   
            }
            catch(err){
                console.log(err)
            }  
        }
        
        fetchPosts()      
    },[])

    return(<>
                {posts ===null
                    ? <h5>Now loading ...........</h5>
                    :   <div className="row row-cols-1 row-cols-md-3 g-4 cardsContainer">
                            {
                                posts.map(post=>
                                    <PostCard 
                                        postTime = {post.timestamp}
                                        postId = {post._id}
                                        postTitle = {post.title}
                                        postPicture = {post.picture}
                                
                                    />
                                )      
                            }
                        </div>  
                        
                }   
            </>)
}



export default Posts ;
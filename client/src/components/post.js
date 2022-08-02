import {useParams} from 'react-router-dom'
import { useState ,useEffect} from 'react'
import Comments from './comments'
const Post =() => {
    var id = useParams()
    var postId = id.postid
    const [ post, setPost ] = useState(null)
    useEffect(()=>{
        const fetchPost =async()=>{
            try{
                var res = await fetch(`http://localhost:3001/api/posts/${postId}`  , {mode:'cors'});
                var data = await res.json()
                setPost(data.post)
                console.log(await data.post.comments)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchPost()

            },[])
    return(
        <>
            <h1>Item</h1> 
            { post === null
                ? <h2>Now loading .....</h2>
                :   <div>
                        <h1>{post.title}</h1>
                        <p>{post.text }</p>
                        <p>{post.timestamp}</p>
                        
                        <Comments postId = {post._id} />
                    </div>
            
            }

        </>
    )
}


export default Post ;
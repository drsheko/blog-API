import {useParams , useNavigate } from 'react-router-dom'
import { useState ,useEffect ,useContext} from 'react'
import Comments from './comments'
import { UserContext } from '../App'
const Post =() => {
    var id = useParams()
    var user = useContext(UserContext)
    var postId = id.postid
    var navigate = useNavigate()
    const [ post, setPost ] = useState(null)

    const deletePost = async() => {
        try{
            var url = `http://localhost:3001/api/remove-post/${postId}`
            var options = {
                method: 'Delete',
                Headers:{
                    'Content-Type': 'application/json'
                }
            }
            var res = await fetch(url , options)
            navigate('/' , { replace : true});
        }catch(err){
            console.log(err)
        }
        
    }

    const handleEdit = () =>{
        var url = `/posts/${postId}/edit`
        var formData = {
            title : post.title,
            text : post.text
        }
        navigate(url , {state :formData})
    }
    useEffect(()=>{
        const fetchPost =async()=>{
            try{
                var res = await fetch(`http://localhost:3001/api/posts/${postId}`  , {mode:'cors'});
                var data = await res.json()
                setPost(data.post)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchPost()

            },[])
    return(
        <>
            
            { post === null
                ? <h2>Now loading .....</h2>
                :   <div>
                        {
                           user == null
                           ? ""
                           : user._id != post.user
                                ? ''
                                :   <>
                                        <button onClick={deletePost}>del</button>
                                        <button onClick={handleEdit} >edit</button>
                                    </>




                        }
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
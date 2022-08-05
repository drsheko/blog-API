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
    const [ isLiked, setIsLiked ] = useState(false)
    const [likesQty, setLikesQty ] = useState(0)

    const [ isDisliked, setIsDisliked ] = useState(false)
    const [dislikesQty, setDislikesQty ] = useState(0)
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


    const handleLike = async() => {
        if(!isLiked){
            try{
                var url =  `http://localhost:3001/api/posts/${postId}/like`
                var options = {
                    method : 'Post',
                    headers : {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        "user":user._id,
                    })
                }

                var res = await fetch(url,options)
                setIsLiked(true)
                setLikesQty(likesQty +1)
            }
            catch(err){
                console.log(err)
            }
        }else{
            try{
                var url =  `http://localhost:3001/api/posts/${postId}/unlike`
                var options = {
                    method : 'Post',
                    headers : {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        "user":user._id,
                    })
                }

                var res = await fetch(url,options)
                setIsLiked(false)
                setLikesQty(likesQty -1)
            }
            catch(err){
                console.log(err)
            }
        }
    }

    const handleDislike = async() => {
        if(!isDisliked){
            try{
                var url =  `http://localhost:3001/api/posts/${postId}/dislike`
                var options = {
                    method : 'Post',
                    headers : {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        "user":user._id,
                    })
                }

                var res = await fetch(url,options)
                setIsDisliked(true)
                setDislikesQty(dislikesQty +1)
            }
            catch(err){
                console.log(err)
            }
        }else{
            try{
                var url =  `http://localhost:3001/api/posts/${postId}/undislike`
                var options = {
                    method : 'Post',
                    headers : {
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        "user":user._id,
                    })
                }

                var res = await fetch(url,options)
                setIsDisliked(false)
                setDislikesQty(dislikesQty -1)
            }
            catch(err){
                console.log(err)
            }
        }
    }




    useEffect(()=>{
        const fetchPost =async()=>{
            try{
                var res = await fetch(`http://localhost:3001/api/posts/${postId}`  , {mode:'cors'});
                var data = await res.json()
                setPost(data.post)
                setLikesQty(data.post.likes.length)
                setDislikesQty(data.post.dislikes.length);
                if(user){
                    //check if user previously liked the post
                    var likeRes = await fetch(`http://localhost:3001/api/posts/${postId}/${user._id}/like`)
                    var likeData = await likeRes.json()
                    setIsLiked(likeData.liked);

                    //check if user previously disliked the post
                    var dislikeRes = await fetch(`http://localhost:3001/api/posts/${postId}/${user._id}/dislike`)
                    var dislikeData = await dislikeRes.json()
                    setIsDisliked(dislikeData.disliked)
                }
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
                        
                       
                        <button onClick={handleLike} 
                            disabled={user!=null && isDisliked==false?false:true}
                                className = {isLiked?'active':'inactive'}
                            >like
                        </button><span>{likesQty}</span>

                        <button onClick={handleDislike} 
                            disabled={user!=null && isLiked==false ?false:true}
                                className = {isDisliked?'active':'inactive'}
                            >dislike
                        </button><span>{dislikesQty}</span>
                        
                        <Comments postId = {post._id} />
                    </div>
            
            }

        </>
    )
}


export default Post ;
import {useParams , useNavigate } from 'react-router-dom'
import { useState ,useEffect ,useContext} from 'react'
import Comments from './comments'
import { UserContext } from '../App'
import { toast } from 'react-toastify'
import moment from 'moment' ;
const Post =({user}) => {
    var id = useParams()
   // var user = props.user
    //var user = useContext(UserContext)
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
            toast.info('The post has been deleted')
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
            try{console.log(user.username +'liked')
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
                toast.info('You liked the post')
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
                toast.info('You unliked the post')
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
                toast.info('You disliked the post')
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
                toast.info('You undisliked the post')
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
            }
            catch(err){
                console.log(err)
            }
        }
        fetchPost()
            },[])

    useEffect(()=>{
        const checkForLikeOrDislike =async()=>{ 
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
        checkForLikeOrDislike()
    },[user])
     
    return(
        <div className='post'>
            
            { post === null
                ? <h2>Now loading .....</h2>
                :   <div >
                      
                        <div className='card customPost'>
                            {
                                user == null? ""
                                : user._id != post.user? ''
                                    :   <div className="btn-group dropstart position-absolute top-3 end-0 me-5">
                                            
                                            <i className="bi bi-list btn " type="button"  data-bs-toggle="dropdown" aria-expanded="false"></i>
                                            <ul className="dropdown-menu shadow-lg">
                                                <li><button className="dropdown-item"  onClick={deletePost}><i class="bi bi-trash-fill"></i> Delete</button></li>
                                                <li><button className="dropdown-item" onClick={handleEdit} > <i class="bi bi-pencil-fill"></i> Edit</button></li>
                                            </ul>
                                        </div>
                            }
                            <div className="card-body">
                                <h3 className="card-title text-center">{post.title}</h3>
                                <p className="card-text"><small className="text-muted">{moment(post.timestamp).format('MMMM Do YYYY, h:mm a')}</small></p>
                            </div>
                            <img src={require(`../images/${post.picture}`)} className="card-img-bottom" alt="..."></img>
                            <h4 className='card-text mt-3 py-2 border-top '>{post.text }</h4>
                            
                            <div className='border-bottom mb-2'> 
                                <button onClick={handleLike} 
                                    disabled={user!=null && isDisliked==false?false:true}
                                        className = {isLiked?'btn btn-primary likeBtn ':'btn btn-outline-primary likeBtn'}>
                                            <i className="bi bi-hand-thumbs-up-fill "></i>
                                            {likesQty}
                                </button>

                                <button onClick={handleDislike} 
                                    disabled={user!=null && isLiked==false ?false:true}
                                        className = {isDisliked?'btn btn-primary dislikeBtn':'btn btn-outline-primary dislikeBtn'}>
                                            <i className="bi bi-hand-thumbs-down-fill"></i>
                                            {dislikesQty}
                                </button>
                            </div>
                            <div className='commentsContainer'>
                                 <Comments postId = {post._id} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}


export default Post ;
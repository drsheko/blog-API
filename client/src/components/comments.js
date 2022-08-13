import { useEffect, useState , useContext } from "react"
import CreateComment from './createComment'
import { UserContext } from "../App";
import { toast } from "react-toastify";
const Comments =({postId}) => {
    var id = postId ;
    var user = useContext(UserContext)
    const [form ,setForm] =useState({text:''})
    const [comments, setComments] = useState([]);
    const [ qty, setQty ] = useState(null)
    const [ isHidden ,setIshidden] = useState(true);
    const [editing, setEditing] = useState(false)
    const [editComment , setEditComment] = useState()

    const handleChange = (e) => {
        setIshidden(!isHidden)
        console.log(user)
    }

    const handleFormChange = (e) => {
        setForm({text:e.target.value})
    }

    const deleteComment = async(commId)=> {
        try{ 
            var url = `http://localhost:3001/api/posts/post/comments/${commId}`
            var options = {
                method: 'Delete',
                Headers:{
                    'Content-Type': 'application/json'
                }
            }
            var res = await fetch(url , options)
            var msg =res.json()
            setComments(
                comments.filter(comment => comment._id !== commId)
            )
            setQty(qty-1);
            setEditing(false)
            toast.success('Comment has been deleted')
        }catch(err){
            console.log(err)
        } 
    }

    const handleEdit = async(commId) => {
        setEditing(true)
        var commentToEdit = comments.find(comment => comment._id == commId)
        setEditComment(commentToEdit)
        setForm({text :  commentToEdit.text})
        
    }
    const saveEdit = async(e) => {
        e.preventDefault()
        try{
            var id = editComment._id
            var url = `http://localhost:3001/api/posts/post/comments/${id}`
            var options = {
                method : 'Put',
                headers : {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    
                    "text": form.text,
                })
            }
            var res = await fetch(url ,options)
            var data =await res.json()
            toast.success('Comment has been edited',{position:toast.POSITION.BOTTOM_RIGHT})
        
            var modifiedComments =   comments.map(comment => {
                    if (comment._id === editComment._id){
                        comment =  {...comment, text : form.text}
                        console.log(comment)
                        return comment
                    }
                    return comment
                }) 
            setComments(modifiedComments)  
            
            setEditComment(null)
            setEditing(!editing);
        }
        catch(err){
            console.log(err)
        } 
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setEditing(false)
        setEditComment(null)
    }
    useEffect(()=>{
        const fetchComments = async() =>{
            try{
                var url = `http://localhost:3001/api/posts/${id}/comments`
            
                var res = await fetch(url , {mode : 'cors'})
                var data = await res.json();
                setComments(data.data.comments)
                setQty( data.data.comments.length)
            }catch(err){
                console.log(err)
            }
        }
        fetchComments()
        
    },[])
    
    return(
        <div>
            <button className="btn btn-outline-primary" onClick={handleChange}>Comments 
                 <span>   {qty} </span>
            </button>
            {
                isHidden !== true
                ?   <>   
                        {
                            user == null
                            ?''
                            :   <CreateComment  
                                    postId ={id} 
                                    setComments ={setComments}
                                    setQty = {setQty}
                                />
                        }
                               
                        
                        {
                            comments.length>0
                            ?   <>
                                    {comments.map(comment =>
                                        <>
                                            <div className="comment-containe row my-1">
                                                
                                                    <img className="rounded-circle col-2 align-self-start" src={require(`../images/${comment.user.avatarURL}`)}/>
                                                
                                                <div className="card comment-card p-3 col-10">
                                                    <div className="row m-0 p-0">
                                                        <div className='col-10'>
                                                            <p className="fw-bold text-info fs-3 mb-0" >{comment.user.username}</p>
                                                            <p className="text-muted fs-6 mt-0 p-0" >{comment.timestamp}</p>
                                                        </div>
                                                        
                                                        {user!= null&& comment.user._id ==user._id
                                                            ?   <div className="row col-2 p-0 m-0">
                                                                    <i className=" bi bi-pencil-square  col-6" hidden={editing?true:false} onClick={()=>{handleEdit(comment._id)}}></i>
                                                                    <i className="bi bi-trash col-6"onClick={()=>{deleteComment(comment._id)}} ></i>
                                                                </div>     
                                                            :null
                                                        }
                                                    </div>
                                                    
                                                    
                                                    <p className="fs-4 text-wrap"hidden={editComment && comment._id ==editComment._id?true:false}  >{comment.text}</p>
                                                    <div hidden={editing&&comment._id ==editComment._id?false:true}>
                                                        <form onSubmit={saveEdit}>
                                                            <textarea value={form.text} onChange={handleFormChange} />
                                                            <button className="btn " onClick={handleCancel}>cancel</button>
                                                            <button type="submit" className="btn btn-sm bi bi-sd-card-fill">Save</button>
                                                        </form>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            
                                        </>
                                       
                                    )}
                                </>
                            : null   
                        }
                    </>  
                : null     
            }
        </div>
    )
}
export default Comments;
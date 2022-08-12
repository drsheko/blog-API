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
            setQty(qty-1)
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
                               
                        <div hidden={editing?false:true}>
                            <form onSubmit={saveEdit}>
                                <input value={form.text} onChange={handleFormChange} />
                                <button onClick={handleCancel}>cancel</button>
                                <button type="submit">Save</button>
                            </form>
                        </div>
                        {
                            comments.length>0
                            ?   <>
                                    {comments.map(comment =>
                                        <>
                                            <h5 hidden={editComment && comment._id ==editComment._id?true:false} >{comment.text}</h5>
                                            {user!= null&& comment.user ==user._id
                                                ?   <>
                                                        <button onClick={()=>{handleEdit(comment._id)}}>e</button>
                                                        <button onClick={()=>{deleteComment(comment._id)}}>d</button>
                                                    </>     
                                                :null
                                            }
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
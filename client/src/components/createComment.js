import { useState ,useContext ,  } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { UserContext } from "../App"

const CreateComment =  (props) => {
    let navigate = useNavigate()
    let user =useContext(UserContext)
    const [form, setForm ] = useState({
        text:''
    }) 

    const handleChange = (e) => { console.log(user)
        setForm({
            ...form,
            text: e.target.value
        })
    }

    const handleFormSubmit = async(e) => {
        try{
            e.preventDefault()
            var id =props.postId
            var url = `http://localhost:3001/api/posts/${id}/comments`
            var options = {
                method : 'Post',
                headers : {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    "text": form.text,
                    user: user._id,
                })  
            }
            
            var res  =await fetch(url , options);
            var data = await res.json();
            var addedComment = data.data
            setForm({text:''})
            props.setComments( (prevState) => [ addedComment, ...props.comments])
            props.setQty( props.qty +1)
            toast.success('Comment has been added' ,{position: toast.POSITION.BOTTOM_RIGHT})
            console.log('comments here', props.comments)
            console.log('add' , addedComment)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="comment-new  mx-2">
            
            <img className="avatar col-2 " src={require(`../images/${user.avatarURL}`)} />
            
            <form onSubmit={handleFormSubmit} className="row ms-2 col-8">
                <div className="pa">
                <textarea className="col-12 p-2" value={form.text}   onChange={handleChange} placeholder="write a comment . . ." />
                <button type="submit"  className=' btn btn-primary  rounded-pill float-end btn-sm ms-2  p-1 text-nowrap align-self-center'
                   hidden = {form.text.trim() =='' ?true:false} 
                    
                > comment</button>
                </div>
            </form>
        </div>
    )
}


export default CreateComment;
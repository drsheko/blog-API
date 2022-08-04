import { useState ,useContext ,  } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"

const CreateComment =  (props) => {
    let navigate = useNavigate()
    let user =useContext(UserContext)
    console.log(user.username)
    const [form, setForm ] = useState({
        text:''
    }) 

    const handleChange = (e) => {
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
            props.setComments( (prevState) => [ addedComment, ...prevState])
            props.setQty(prevState => prevState +1)

        }
        catch(err){
            console.log(err)
        }

    }
    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <input value={form.text} onChange={handleChange} placeholder="write a comment" />
                <button type="submit"> comment</button>
            </form>
        </div>
    )
}


export default CreateComment;
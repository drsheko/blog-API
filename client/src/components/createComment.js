import { useState ,useContext } from "react"
import { UserContext } from "../App"

const CreateComment =  ({postId}) => {
    let user =useContext(UserContext)
    const [form, setForm ] = useState({
        text:''
    }) 

    const handleChange = (e) => {
        setForm({
            ...form,
            text: e.target.value
        })
    }

    const handleFormSubmit = async() => {
        try{
            var id = postId
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
            var res  =await fetch(url , options)
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
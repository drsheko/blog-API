import { useState ,useContext} from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App";

const CreatePost = () => {
    let navigate = useNavigate();
    let user = useContext(UserContext)
    const [form, setForm] = useState({
        user:'',
        title:'',
        text:'',
        isPublished:true
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:[e.target.value]
        })
    }


    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try{
            var url = "http://localhost:3001/api/post"
            var options = {
                method : 'Post',
                headers : {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    "title":form.title,
                    "text": form.text,
                    user: user._id
                })

            }
            var res = await fetch(url ,options)
            var data =await res.json()
            navigate('/' , {replace:true})

        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>title:</label>
                <input value={form.title} name = 'title' onChange={handleChange} />

                <label>text:</label>
                <input value={form.text} name = 'text' onChange={handleChange} />
            
                <button type="submit" value="submit">Confirm</button>
            </form>
        
        </>
    )
}

export default CreatePost ;
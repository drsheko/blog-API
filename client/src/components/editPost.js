import { useState } from "react"
import { useNavigate ,useLocation , useParams} from "react-router-dom"


const EditPost = () => {
    let navigate = useNavigate();
    let postId = useParams().postid
    let formData = useLocation().state

    const [form, setForm] = useState({
        title:formData.title,
        text:formData.text,
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
            var url = `http://localhost:3001/api/posts/post/${postId}`
            var options = {
                method : 'Put',
                headers : {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    "title":form.title,
                    "text": form.text,
                })
            }
            var res = await fetch(url ,options)
            var data =await res.json()
            navigate(-1)
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className="border shadow-lg border-2 rounded m-5 p-5">
                <h2 className="card-header h3">Update a blog</h2>
                <label className="form-label mt-2">title:</label>
                <input value={form.title} className="form-control"  name = 'title' onChange={handleChange} />

                <label  className="form-label mt-2">text:</label>
                <textarea value={form.text} className="form-control" name='text' onChange={handleChange} />
            
                <button type="submit"  className="btn  btn-primary mt-3 rounded-pill" value="submit">Update</button>
            </form>   
        </>
    )
}

export default EditPost ;
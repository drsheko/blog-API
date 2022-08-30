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
    const [upload , setUpload] = useState(null)


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:[e.target.value]
        })
    }

    const uploadPhoto = async(e)=> { 
        var file = e.target.files[0]
        setUpload(file)

    }
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try{
            var url = "http://localhost:3001/api/post"
            var formData = new FormData()
            formData.append('title', form.title);
            formData.append('text', form.text);
            formData.append('user', user._id);
            formData.append('postPhoto', upload)
            
            var res = await fetch(url ,{
                method:'Post',
                body: formData
            });
            var data =await res.json()
            navigate('/' , {replace:true})

        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <>
            <form onSubmit={handleFormSubmit} className="border shadow-lg border-2 rounded m-5 p-5">
                <h2 className="card-header h3"> Create a blog</h2>
                <label className="form-label mt-2">title:</label>
                <input value={form.title} className="form-control" name ='title' onChange={handleChange} required />

                <label className="form-label mt-2">text:</label>
                <textarea value={form.text} className="form-control" name = 'text' onChange={handleChange} required />
                
                <label className="form-label mt-2">Photo</label>
                <input type="file" class="form-control" name='postPhoto'   onChange={uploadPhoto}  />

                <button type="submit" className="btn  btn-primary my-2" value="submit">Confirm</button>
            </form>
        
        </>
    )
}

export default CreatePost ;
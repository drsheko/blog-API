
import { useEffect , useState } from "react";
import {Link ,useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
const Signup =()=>{
    let navigate = useNavigate();
    const [error , setError] = useState()
    const [form , setForm] = useState({
        username:'',
        password:'',
        confirmPassword:''
    });
    const [upload , setUpload] = useState(null)
    const [isSelected , setIsSelected] = useState(false)
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        try{
            var res = await fetch('http://localhost:3001/api/sign-up',{
                method:'Post',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:new URLSearchParams({
                    "username":form.username,
                    "password":form.password,
                    "confirmPassword":form.confirmPassword
                }),
                file: upload
            })
            var data = await res.json()
            if('errors' in data){
                console.log(data)
                setError(data.errors)
                console.log(error)

            }else{
                navigate('/login',{replace:true})
                toast.success('Account created')
            }
             
        }catch(err){
            setError(err)
        }       
    }
   

    const handleChange =(e)=>{
        setForm({...form,
            [e.target.name]:e.target.value})
    }
    const uploadFile = (e) => {
        var file = e.target.files[0]
        setUpload(file)
        setIsSelected(true)
    }

    return(
        <div>
            
            <h1>Sign up</h1>
            <h5>Do you an account?<span><Link to ="/login" >Log in</Link></span></h5>
            { typeof error != 'undefined'
            ? error.map(err=>
                <h4>{err}</h4>
                )
            :<></>}
            <form onSubmit={handleFormSubmit} >
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange} />

                <label> Password</label>
                <input  type={"password"} name='password' value={form.password} onChange={handleChange} />

                <label>Confirm Password</label>
                <input  type={"password"} name='confirmPassword' value={form.confirmPassword} onChange={handleChange} />

                <label>Photo</label>
                <input type="file" name='avataruRL'  onChange={uploadFile}  />
                { isSelected 
                ?<p>{upload.size}</p>
                :''}
               
                <button type="submit" value="submit">Create account</button>
            </form>
        </div>
    )
}

export default Signup ; 

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
    const [image, setImage] = useState(null)
    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        try{ 
            var formData =new FormData()
            formData.append('username',form.username)
            formData.append('password', form.password)
            formData.append('confirmPassword',form.confirmPassword)
            formData.append('avatarURL',upload)

            var res = await fetch('http://localhost:3001/api/sign-up',{
                method:'Post',
                body:formData
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
    const uploadFile = async(e) => {
        var file = e.target.files[0]
         setUpload(file)
        setIsSelected(true)
        if(e.target.files&&e.target.files[0]){
            setImage(URL.createObjectURL(file))
        } 
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
            <form className='card m-5 p-3' onSubmit={handleFormSubmit}  >
                <img src={image ?image : require('../images/unkownUserDefault.webp')} height= '100' width={100} />

                <label className="form-label">Username</label>
                <input type="text" className="form-control" name='username' value={form.username} onChange={handleChange} />

                <label className="form-label"> Password</label>
                <input  type={"password"} className="form-control" name='password' value={form.password} onChange={handleChange} />

                <label className="form-label">Confirm Password</label>
                <input  type={"password"} className="form-control" name='confirmPassword' value={form.confirmPassword} onChange={handleChange} />

                <label className="form-label">Photo</label>
                <input type="file" class="form-control" name='avatarURL'   onChange={uploadFile}  />
                
                
               
                <button type="submit" value="submit">Create account</button>
            </form>
        </div>
    )
}

export default Signup ; 
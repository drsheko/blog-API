
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
        <div className="card  m-5 ">
            <div className="card-header">
                <h1 className=" text-center">Sign up</h1>
                <h5 className="text-center text-muted ">Do you have an account?<span><Link to ="/login" >Log in</Link></span></h5>
            </div>

            <form className='card m-5 py-2 px-5' onSubmit={handleFormSubmit}  >
                <div className="text-center col-12">
                    <img src={image ?image : require('../images/unkownUserDefault.webp')}  className="rounded float-end " height= '100' width={100} />
                </div>
               

                <label className="form-label">Username</label>
                <input type="text" className="form-control" name='username' value={form.username} onChange={handleChange} require />

                <label className="form-label"> Password</label>
                <input  type={"password"} className="form-control" name='password' value={form.password} onChange={handleChange} require/>

                <label className="form-label">Confirm Password</label>
                <input  type={"password"} className="form-control" name='confirmPassword' value={form.confirmPassword} onChange={handleChange} require/>

                <label className="form-label">Photo</label>
                <input type="file" class="form-control" name='avatarURL'   onChange={uploadFile}  />
                
                { typeof error != 'undefined'
                    ? error.map(err=>
                        <h4 className="text-danger h5 my-2">- {err}</h4>
                        )
                    :<></>
                }
               <div className="col-12">
                     <button type="submit" value="submit" className="btn btn-primary   text-center my-4">Create account</button>
               </div>
                
            </form>
        </div>
    )
}

export default Signup ; 
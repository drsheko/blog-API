
import { useEffect , useState } from "react";
import {Link ,useNavigate} from 'react-router-dom'
const Signup =()=>{
    let navigate = useNavigate();
    const [error , setError] = useState()
    const [form , setForm] = useState({
        username:'',
        password:'',
        confirmPassword:''
    });

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        console.log(form);
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
            })
            var data = await res.json()
            console.log(data) 
             navigate('/',{replace:true})
        }catch(err){
            setError(err)
        }
        
        
    }
    const getInfo =async(e)=>{
        e.preventDefault()
        var url ="https://pixabay.com/api/?key=27818144-b35666e63fd37e75787508770&q=cars&image_type=photo"
       var res = await fetch("http://localhost:3001/api/posts"  , {mode:'cors'})
        var data = await res.json()
        console.log(data)
    }

    const handleChange =(e)=>{
        setForm({...form,
            [e.target.name]:e.target.value})
    }


    return(
        <div>
            <button onClick={getInfo}>Info</button>
            <h1>Sign up</h1>
            <h5>Do you an account?<span><Link to ="/login" >Log in</Link></span></h5>
            { typeof error != 'undefined'
            ?<h4>{error}</h4>
            :<></>}
            <form onSubmit={handleFormSubmit} >
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange} />

                <label> Password</label>
                <input  type={"password"} name='password' value={form.password} onChange={handleChange} />

                <label>Confirm Password</label>
                <input  type={"password"} name='confirmPassword' value={form.confirmPassword} onChange={handleChange} />

                <button type="submit" value="submit">Create account</button>
            </form>
        </div>
    )
}

export default Signup ; 
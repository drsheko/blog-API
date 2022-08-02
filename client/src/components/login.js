import { useState } from "react";
import {useNavigate} from "react-router-dom"
const Login =( {getUser})=>{
    let navigate = useNavigate()
    const [form , setForm] = useState({
        username:'',
        password:''
    });

    const [error,setError] = useState()

    const handleFormSubmit = async(e)=>{
       try{
            e.preventDefault();
            
            var res = await fetch('http://localhost:3001/api/login',{
                method:'Post',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:new URLSearchParams({
                    "username":form.username,
                    "password":form.password
                }),
            })
            var data = await res.json()
            
            var user = await data.user
            getUser(user) //send user to app
            navigate('/' , {replace:true})
       }catch(err){
            setError(err)
       }
        
    }

    const handleChange =(e)=>{
        setForm({...form,
            [e.target.name]:e.target.value})
    }

    return(
        <div>
            {typeof error != 'undefined'
            ? <h3>{error}</h3>
            :<></>
            }
            <form onSubmit={handleFormSubmit} >
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange} />
                <label> Password</label>
                <input  type={"password"} name='password' value={form.password} onChange={handleChange} />
                <button type="submit" value="submit">Log in</button>
            </form>
        </div>
    )
}


export default Login;
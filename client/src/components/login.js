import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
const Login =( {getUser})=>{
    let navigate = useNavigate()
    const [errors, setErrors ] = useState()
    const [form , setForm] = useState({
        username:'',
        password:''
    });

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
            console.log(data)
            var user = await data.user
            if ('errors' in data){
               setErrors(data.errors.error)
            }else{ console.log('else runs')
                getUser(user) //send user to app
                // Save logged user to local storage 
                localStorage.setItem('user' ,JSON.stringify(user) )
                navigate('/' , {replace:true})
            }
            
       }catch(err){
            //setError(err)
            console.log(err)
       }
        
    }

    const handleChange =(e)=>{
        setForm({...form,
            [e.target.name]:e.target.value})
    }

    const togglePassword = () =>{
        var input = document.getElementById('password')
        if (input.type === "password") {
            input.type = "text";
          } else {
            input.type = "password";
          }
    }

    useEffect(()=>{},[errors])

    return(
        <div>
            {typeof errors != 'undefined'
            ? <h3>{errors}</h3>
            :<></>
            }
            <form onSubmit={handleFormSubmit} >
                <label>Username</label>
                <input type="text" name='username' value={form.username} onChange={handleChange} required />
                <label> Password</label>
                <input  type={"password"} name='password' value={form.password} onChange={handleChange} id='password' autoComplete="on"  required/>
                <input type='checkbox' onClick={togglePassword}/> <span> Show password</span>
                <button type="submit" value="submit">Log in</button>
            </form>
        </div>
    )
}


export default Login;
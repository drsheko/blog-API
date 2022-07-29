
import { useEffect , useState } from "react";

const Signup =()=>{
    const [form , setForm] = useState({
        username:'',
        password:''
    });

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        console.log(form);
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
            <h5>Do you an account?<span><a href="#" >Log in</a></span></h5>

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

export default Signup ; 
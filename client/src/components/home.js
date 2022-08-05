import {Link ,useNavigate} from 'react-router-dom'
import Posts from './posts';


const Home =({user, setUser}) => {
    let navigate = useNavigate()
    
    // logout 
    const logout = () => {
        setUser(null)
        localStorage.clear()
        navigate('/')
    }

    return(
        <div>
            <h1>Home Page</h1>
            { user != null
                ?   <>
                        <h2>Hi {user.username}</h2>
                        <Link to = '/posts/create-post'> Create a new post</Link>
                        <button onClick={logout}>Logout</button>
                    </> 
                :  <Link to = '/signup'>  <h4>Get start</h4> </Link>
            }
            
            <h1>Posts</h1>
            <Posts />
        </div>
    )
}

export default Home ;
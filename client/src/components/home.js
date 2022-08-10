import {Link ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import Posts from './posts';


const Home =({user, setUser}) => {
    let navigate = useNavigate()
    
    // logout 
    const logout = () => {
        setUser(null)
        localStorage.clear()
        navigate('/')
        toast.success('You logged out successfully')
    }

    return(
        <div>

     
            <div class='contentContainer row g-0'>
                <div className=' col-4 homeTextContainer'>
                    <p>its nice to have website ..where you can express your feelings and share your knowledge tp the world!!</p>
                    <div className='text-center'>
                        { user != null
                            ?   <>
                                    <h2>Hi {user.username}</h2>
                                    <Link to = '/posts/create-post'> Create a new post</Link>
                                    <button onClick={logout}>Logout</button>
                                </> 
                            :   <button>
                                    <Link to = '/signup'>  Get start </Link>
                                </button>
                                    
                        }
                    </div>
                </div>
                <div className=' col-8 ' >
                    <img  src={require('../images/blog.webp')}/>
                </div>
            </div>
            
            <h1>Posts</h1>
            <Posts />
        </div>
    )
}

export default Home ;
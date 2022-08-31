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
        <div className='container'>
            <div className='contentContaine row g-0'>
                <div className=' col-5  homeTextContainer'>
                    <p>its nice to have website ..where you can express your feelings and share your knowledge tp the world!!</p>
                    <div className='text-center'>
                        { user != null
                            ?   <>
                                    <h2 className='h6'>Welcome back <span className='fw-bold'> {user.username}!</span> </h2>
                                    <i class="bi bi-plus-circle-fill btn btn-success rounded-pill"><Link to = '/posts/create-post'><span className='fw-bold text-light'> New blog</span></Link></i>
                                    
                                </> 
                            :   <button className='btn btn-success rounded-pill '>
                                    <Link to = '/signup'>  <span className='text-light fw-bold'> Get Started</span></Link>
                                </button>             
                        }
                    </div>
                </div>
                <div className='   col-7' >
                    <img  className="cover col-12" src={require('../images/blog.webp')}/>
                </div>
            </div>

            <Posts />
        </div>
    )
}

export default Home ;
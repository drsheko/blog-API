import {Link} from 'react-router-dom'
import Posts from './posts';


const Home =({user}) => {
    
    return(
        <div>
            <h1>Home Page</h1>
            {typeof user != "undefined"
                ? <h2>Hi {user.username}</h2>
                : <Link to = '/signup'>  <h4>Get start</h4> </Link>
            }
            
            <h1>Posts</h1>
            <Posts />
        </div>
    )
}

export default Home ;
import {Link} from 'react-router-dom'


const Home =({user}) => {
    
    return(
        <div>
            <h1>Home Page</h1>
            {typeof user != "undefined"
                ? <h2>Hi {user.username}</h2>
                : <Link to = '/login'>  <h4>Login</h4> </Link>
            }
            
            
        </div>
    )
}

export default Home ;
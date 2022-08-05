import {useState , useEffect ,createContext} from 'react';
import { BrowserRouter , Link, Route ,Routes  } from "react-router-dom";
import './App.css';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Post from './components/post';
import Posts from './components/posts';
import CreatePost from './components/createPost';
import EditPost from './components/editPost';
export const UserContext = createContext()
function App() {
  const [user , setUser] = useState(null);
  const [posts, setPosts] = useState()
  
  
  //Set user after login 
  const getUser=(currUser)=>{
      setUser(currUser)
  }

  // get Posts 
  const getPosts = (allPosts) => {
      setPosts(allPosts)
  }

  

  useEffect(()=>{
    const loggedUser = localStorage.getItem('user')
    if (loggedUser){
      const foundUser = JSON.parse(loggedUser);
      setUser(foundUser)
    }
  },[])
  
  return (
    < UserContext.Provider value={user}>
        <BrowserRouter>
    <div>
     
      <Routes>
          <Route exact path = '/'         element={<Home user={user} setUser={setUser}/>} />
          <Route path = '/signup'   element={<Signup />}   />
          <Route path = '/login'    element={<Login getUser={getUser}/>}     />
          <Route exact path = "/posts"    elemenet = {<Posts getPosts={getPosts} />}  />
          <Route path ='/posts/:postid' element =  { <Post/>} />
          <Route path = "/posts/create-post" element = { <CreatePost /> } />
          <Route path = "/posts/:postid/edit" element = { <EditPost /> } />
      </Routes>

      
      
    </div>
  
  
  
  
  </BrowserRouter>
    
    
    </UserContext.Provider>
    
  );
}

export default App;

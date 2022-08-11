import {useState , useEffect ,createContext} from 'react';
import { BrowserRouter , Link, Route ,Routes  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header'
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
      <Header />
      <ToastContainer />
      <BrowserRouter>
          <Routes>
              <Route exact path = '/'         element={<Home user={user} setUser={setUser}/>} />
              <Route path = '/signup'   element={<Signup />}   />
              <Route path = '/login'    element={<Login getUser={getUser}/>}     />
              <Route exact path = "/posts"    elemenet = {<Posts getPosts={getPosts} />}  />
              <Route path ='/posts/:postid' element =  { <Post user={user}/>} />
              <Route path = "/posts/create-post" element = { <CreatePost /> } />
              <Route path = "/posts/:postid/edit" element = { <EditPost /> } />
          </Routes>
      </BrowserRouter>
   
    </UserContext.Provider>
 
  );
}

export default App;

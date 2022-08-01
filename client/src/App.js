import {useState , useEffect} from 'react';
import { BrowserRouter , Link, Route ,Routes } from "react-router-dom";
import './App.css';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import Post from './components/post';
import Posts from './components/posts';
function App() {
  const [user , setUser] = useState();
  const [posts, setPosts] = useState()
  let num =12

  //Set user after login 
  const getUser=(currUser)=>{
      setUser(currUser)
  }

  // get Posts 
  const getPosts = (allPosts) => {
      setPosts(allPosts)
  }
  
  return (

    <BrowserRouter>
    <div>
     
      <Routes>
          <Route path = '/'         element={<Home user={user}/>} />
          <Route path = '/signup'   element={<Signup />}   />
          <Route path = '/login'    element={<Login getUser={getUser}/>}     />
          <Route path = "/posts"    elemenet = {<Posts getPosts={getPosts} />}  />
          <Route path = "/posts/:postId"   elemenet = {<Post />}  posts={posts}/>
      
      </Routes>

      
      
    </div>
  
  
  
  
  </BrowserRouter>
  );
}

export default App;

import {useState , useEffect} from 'react';
import { BrowserRouter , Link, Route ,Routes } from "react-router-dom";
import './App.css';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const [user , setUser] =useState();

  let num =12

  //Set user after login 
  const getUser=(currUser)=>{
      setUser(currUser)
  }
  
  return (

    <BrowserRouter>
    <div>
     
      <Routes>
          <Route path = '/'         element={<Home user={user}/>} />
          <Route path = '/signup'   element={<Signup />}   />
          <Route path = '/login'    element={<Login getUser={getUser}/>}     />
      </Routes>

      
      
    </div>
  
  
  
  
  </BrowserRouter>
  );
}

export default App;

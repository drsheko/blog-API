import {useState , useEffect} from 'react';
import { BrowserRouter , Link, Route ,Routes } from "react-router-dom";
import './App.css';
import Signup from './components/signup';

function App() {
  return (
    <BrowserRouter>
    <div>
     <Link to="/signup"> Sign up</Link>
      <Routes>

          <Route path='/signup'  element={<Signup />}   />

      </Routes>



    </div>
  
  
  
  
  </BrowserRouter>
  );
}

export default App;

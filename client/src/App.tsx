import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import { useSelector} from 'react-redux'
import { RootState } from "./store";

import './app.css';

function App() {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <>
    
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user" element={<Welcome/>}/>
      </Routes>
    
    
    </>
  )
}

export default App

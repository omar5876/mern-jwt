import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';
import Login from "./components/Login";
import Singup from "./components/Singup";
import Welcome from "./components/Welcome";
import './app.css';

function App() {


  return (
    <>
    
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Singup/>}/>
        <Route path="/user" element={<Welcome/>}/>
      </Routes>
    
    
    </>
  )
}

export default App

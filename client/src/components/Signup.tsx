import React, { useState } from 'react'
import './Signup.css'

function Singup() {
  const [input, setInput] = useState({
    name:'',
    email:'',
    password:''
  });
  return (

      <form className='formContainer flex flex-col mx-auto'>
        <input type="text" placeholder='Name' value={input.name}/>
        <input type="text" placeholder='Email' autoComplete='new-password' value={input.email}/>
        <input type="password" placeholder='Password' autoComplete='new-password' value={input.password}/>
        <input type="submit" value={'Signup'} className='border border-slate-300 hover:border-indigo-300 hover:cursor-pointer'/>
      </form>

  )
}

export default Singup
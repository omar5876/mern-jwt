import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Singup() {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(input)
    axios.post('http://localhost:4444/user/signup', input)
    .then(res => {
      console.log(res.data)
      navigate('/login')
    })
    .catch(err => alert(err.response.data.message))
  };
  return (
    <form className="formContainer flex flex-col mx-auto">
      <input
        type="text"
        placeholder="Name"
        value={input.name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Email"
        autoComplete="new-password"
        value={input.email}
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={input.password}
        name="password"
        onChange={handleChange}
      />
      <input
        type="submit"
        value={"Signup"}
        className="border border-slate-300 hover:border-indigo-300 hover:cursor-pointer"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default Singup;

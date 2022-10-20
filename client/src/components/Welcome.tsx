import React, { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

interface User {
  email: string;
  name:  string;
  __v:   number;
  _id:   string;
}

function Welcome() {
  const [user, setUser] = useState<User>()
  console.log('User =', user)
  useEffect(() => {
    axios.get('http://localhost:4444/user/users', {withCredentials: true})
    .then(res => {
      console.log(res)
      setUser(res.data.user)
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <h1>{user && user.name}</h1>
      <h1>{user && user.email}</h1>
    </div>
  )
}

export default Welcome
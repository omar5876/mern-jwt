import React, { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true;

let firstRender = true;

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
    if (firstRender) {
      firstRender = false;
      axios.get('http://localhost:4444/user/users', {withCredentials: true})
      .then(res => setUser(res.data.user))
      .catch(err => console.log(err))
    }
    
    let interval = setInterval(() => {

      axios.get('http://localhost:4444/user/refresh', {withCredentials: true})
      .then(res => setUser(res.data.user))
      .catch(err => console.log(err))
    }, 1000 * 30)

    return () => clearInterval(interval)    


  }, [])
  return (
    <div>
      <h1>{user && user.name}</h1>
      <h1>{user && user.email}</h1>
    </div>
  )
}

export default Welcome
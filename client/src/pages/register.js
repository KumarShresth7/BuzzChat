import React from 'react'
import { useState } from 'react';
import axios from 'axios';
// import '../pages/styles/register.css'

const Register = () => {

  const [email, setemail] = useState({})
  const [username, setusername] = useState({});
  const [password, setpassword] = useState({});

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res = await axios.post(' http://localhost:5000/api/auth/register', {email, username, password });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }

  }

  return (
    <div>
      <div class="container">
        <div class="card">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email ID"
            required
            onChange={(e)=>setemail(e.target.value)}
            />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              onChange={(e)=>setusername(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e)=>setpassword(e.target.value)}
            />
            <a href='/'>Already a Member?</a>
            <br/>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
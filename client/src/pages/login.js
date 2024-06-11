import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../pages/styles/login.css';

const Login = () => {

  const [username, setusername] = useState({});
  const [password, setpassword] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      console.log(res.data);
      localStorage.setItem('token',res.data.token);
      navigate('/chat');
      
    } catch (err) {
      console.error(err.response.data);
    }

  }


  return (
    <div>
      <div class="container">
        <div class="card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <a href='/register'>New User?</a>
            <br/>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
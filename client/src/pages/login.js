import React from 'react'
import '../pages/styles/login.css';

const login = () => {
  return (
    <div>
      <div class="container">
        <div class="card">
          <h2>Login</h2>
          <form>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
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

export default login
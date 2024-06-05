import React from 'react'

const register = () => {
  return (
    <div>
      <div class="container">
        <div class="card">
          <h2>Register</h2>
          <form>
            <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email ID"
            required
            />
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
            <a href='/'>Already a Member?</a>
            <br/>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default register
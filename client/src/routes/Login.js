import { React, useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginButton() {
    try {
      const response = await
        fetch('http://localhost:3001/api/users/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password
          }),
        }
        );

      const json = await response.json();
      console.log(json)

      if (json === null) {
        alert(json.message);
      } else {
        localStorage.setItem('jwt', json.token);
        alert(json.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function logOutButton() {
    localStorage.clear('jwt');
    alert('Logged out');
    window.location.reload(false);
  }

  return (
    <div>
      <form onSubmit={(e) => {
        setUsername('');
        setPassword('');
        e.preventDefault();
      }}>
        <div>
          <h2>Login/Logout</h2>

          <input placeholder='Username' value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button onClick={loginButton}>Enter username and password</button>

          <div>
            <button onClick={logOutButton}>Log Out</button>
          </div>

          <h3>If user not found, create one:</h3>
          <Link to="/signup"><button>Sign Up</button></Link>

        </div>
      </form>
    </div>
  );
}

export default Login;

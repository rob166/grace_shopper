import { React, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


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
      
      alert(json.message);
      if (json.token) {
        localStorage.setItem('jwt', json.token);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function logOutButton() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      alert('Already logged out');
    } else {
      localStorage.clear('jwt');
      alert('Logged out');
      //window.location.reload(false);
      navigate("/home");
    }
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

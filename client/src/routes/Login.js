import React from 'react';
import { Link } from "react-router-dom";

const Login = (props) => {
  const BASE_URL = props.BASE_URL;

  //const setMyUserName = props.setMyUserName

  async function loginButton() {
    try {
      const body = JSON.stringify({
        username: props.username,
        password: props.password
      });
      const response = await
        fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }
        );

      const json = await response.json();

      console.log(json)

      if (json.error) {

        alert(json.message);

      } else {

        localStorage.setItem('jwt', json.token);
        //setMyUserName(props.username)
        alert(json.message);
        //history.push("/home")

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
        props.setUsername('');
        props.setPassword('');
        e.preventDefault();
      }}>
        <div>
          <h2>Login/Logout</h2>

          <input required="required" placeholder='Username' value={props.username}
            onChange={(e) => props.setUsername(e.target.value)} />

          <input required="required" placeholder='Password' type={'password'} value={props.password}
            onChange={(e) => props.setPassword(e.target.value)} />


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

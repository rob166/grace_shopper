import React from 'react';
import { Link } from "react-router-dom";

const Signup = (props) => {
  
  const BASE_URL = props.BASE_URL;

  //const setMyUserName = props.setMyUserName

  async function signupButton() {
    try {
      const body = JSON.stringify({
        username: props.username,
        password: props.password
      });
      const response = await
        fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        }
        );

      const json = await response.json();
      console.log(json);


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

  return (
    <div>
      <form onSubmit={(e) => {
        props.setUsername('');
        props.setPassword('');
        e.preventDefault();
      }
      }>
        <div>
          <h2>Signup</h2>

          <input required placeholder='Username' value={props.username}
            onChange={(e) => props.setUsername(e.target.value)} />

          <input required placeholder='Password' type={'password'} value={props.password}
            onChange={(e) => props.setPassword(e.target.value)} />

          <button onClick={signupButton}>Enter new username and password</button>

          <h3>If user already exists, log in:</h3>
          <Link to="/login"><button>Log In</button></Link>

        </div>
      </form>
    </div>
  );
}

export default Signup;

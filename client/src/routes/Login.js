import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginCss from '../css/Login.module.css';
import { NotificationManager } from 'react-notifications';

const Login = ({ cookie }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginButton() {
    try {
      const response = await fetch('https://grace-shopper-buzzed.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const json = await response.json();

      NotificationManager.success(json.message);
      localStorage.setItem('jwt', json.token);
      cookie.set('userId', json.user.id);
      cookie.set('isAdmin', json.user.is_admin);
      json.user.is_admin === true ? navigate('/admin') : navigate('/home');
    } catch (error) {
      console.error(error);
    }
  }

  function logOutButton() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      NotificationManager.info('You have been logged out.');
    } else {
      localStorage.clear('jwt');
      cookie.remove('userId');
      cookie.remove('isAdmin');
      NotificationManager.success('You are logged out.');
      navigate('/home');
    }
  }

  return (
    <div className={LoginCss.body}>
      <form
        onSubmit={(e) => {
          setUsername('');
          setPassword('');
          e.preventDefault();
        }}
      >
        <div className={LoginCss.answerBox}>
          <h2 className={LoginCss.answerBoxText}>Login</h2>
          <div className={LoginCss.input}>
            <input
              className={LoginCss.inputBox}
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={LoginCss.inputBox}
              placeholder='Password'
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={LoginCss.buttons}>
            <button className={LoginCss.button} onClick={loginButton}>
              Submit
            </button>
          </div>

          <div className={LoginCss.buttons}>
            <button className={LoginCss.buttonLogOut} onClick={logOutButton}>
              Log Out
            </button>
          </div>

          <h3 className={LoginCss.answerBoxText}>
            Not yet a member? Register here:
          </h3>
          <div className={LoginCss.buttons}>
            <Link className={LoginCss.buttonLink} to='/signup'>
              <button className={LoginCss.buttonLink}>Sign Up</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { React, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SignupCss from '../css/Signup.module.css'

const Signup = ({ cookie }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [address_line1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  async function signupButton() {
    try {
      const body = JSON.stringify({
        email: email,
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        address_line1: address_line1,
        city: city,
        state: state,
        zipcode: zipcode,
        phone: phone
      });
      const response = await
        fetch('http://localhost:3001/api/users/register', {
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
        cookie.set('userId', json.user.id);
        cookie.set('isAdmin', json.user.is_admin);
        alert(json.message);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={SignupCss.body}>
      <form onSubmit={(e) => {
        setEmail('');
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setAddress1('');
        setCity('');
        setState('');
        setZipcode('');
        setPhone('');
        e.preventDefault();
      }
      }>
        <div className={SignupCss.answerBox}>

          <h2 className={SignupCss.answerBoxText}>Signup</h2>
          <div className={SignupCss.input}>
            <div className={SignupCss.inputColumn}>
          <input className={SignupCss.inputBox} placeholder='Email' value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='Username' value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='First Name' value={first_name}
            onChange={(e) => setFirstName(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='Last Name' value={last_name}
            onChange={(e) => setLastName(e.target.value)} />
</div>
<div className={SignupCss.inputColumn}>
          <input className={SignupCss.inputBox} placeholder='Address' value={address_line1}
            onChange={(e) => setAddress1(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='City' value={city}
            onChange={(e) => setCity(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='State Code' type="text" minLength="2" maxLength="2" value={state}
            onChange={(e) => setState(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='Zipcode (0-9 only)' minLength="5" maxLength="5" value={zipcode}
            onChange={(e) => setZipcode(e.target.value)} />

          <input className={SignupCss.inputBox} placeholder='Phone' value={phone}
            onChange={(e) => setPhone(e.target.value)} />
            </div>
            </div>
          <div className={SignupCss.buttons}>
          <button className={SignupCss.button} onClick={signupButton}>Enter your information</button>
        </div>
        <h3 className={SignupCss.answerBoxText}>Username already exists? Log in here:</h3>
        <div lassName={SignupCss.buttons}>
          <Link className={SignupCss.buttonLink} to="/login"><button className={SignupCss.buttonLink}>Log In</button></Link>
        </div>
    </div>
      </form >
    </div >
  );
}

export default Signup;

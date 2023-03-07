import { React, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Signup = ({cookie}) => {
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
    <div>
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
        <div>
          <h2>Signup</h2>

          <input placeholder='Email' value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <input placeholder='Username' value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <input placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <input placeholder='First Name' value={first_name}
            onChange={(e) => setFirstName(e.target.value)} />

          <input placeholder='Last Name' value={last_name}
            onChange={(e) => setLastName(e.target.value)} />

          <input placeholder='Address' value={address_line1}
            onChange={(e) => setAddress1(e.target.value)} />

          <input placeholder='City' value={city}
            onChange={(e) => setCity(e.target.value)} />

          <input placeholder='State Code' type="text" minLength="2" maxLength="2" value={state}
            onChange={(e) => setState(e.target.value)} />

          <input placeholder='Zipcode (0-9 only)' minLength="5" maxLength="5" value={zipcode}
            onChange={(e) => setZipcode(e.target.value)} />

          <input placeholder='Phone' value={phone}
            onChange={(e) => setPhone(e.target.value)} />

          <button onClick={signupButton}>Enter your information</button>

          <h3>If user already exists, log in:</h3>
          <Link to="/login"><button>Log In</button></Link>

        </div>
      </form>
    </div>
  );
}

export default Signup;

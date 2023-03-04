import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const ProfileEdit = (props) => {
      const location = useLocation();
      const propsData = location.state;
      const [email, setEmail] = useState(propsData.email);
      //const [username, setUsername] = useState('');
      //const [password, setPassword] = useState('');
      const [first_name, setFirstName] = useState(propsData.first_name);
      const [last_name, setLastName] = useState(propsData.last_name);
      const [address_line1, setAddress1] = useState(propsData.address_line1);
      const [city, setCity] = useState(propsData.city);
      const [state, setState] = useState(propsData.state);
      const [zipcode, setZipcode] = useState(propsData.zipcode);
      const [phone, setPhone] = useState(propsData.phone);
      const jwt = localStorage.getItem('jwt');

      async function editMyUser() {
            try {
                  const response = await fetch('http://localhost:3001/api/users/user/edit', {
                        method: "PATCH",
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${jwt}`
                        },
                        body: JSON.stringify({
                              email: email,
                              first_name: first_name,
                              last_name: last_name,
                              address_line1: address_line1,
                              city: city,
                              state: state,
                              zipcode: zipcode,
                              phone: phone
                        }),
                  });
                  const json = await response.json();
                  console.log(json);
            } catch (error) {
                  console.error(error);
            }
      };

      return (
            <div>
                  <form onSubmit={(e) => {
                        e.preventDefault();
                  }
                  }>
                        <div>
                              <input placeholder='Email' value={email}
                                    onChange={(e) => setEmail(e.target.value)} />

                              <input placeholder='First Name' value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)} />

                              <input placeholder='Last Name' value={last_name}
                                    onChange={(e) => setLastName(e.target.value)} />

                              <input placeholder='Address' value={address_line1}
                                    onChange={(e) => setAddress1(e.target.value)} />

                              <input placeholder='City' value={city}
                                    onChange={(e) => setCity(e.target.value)} />

                              <input placeholder='State Code' type="text" maxLength="2" value={state}
                                    onChange={(e) => setState(e.target.value)} />

                              <input placeholder='Zipcode (0-9 only)' maxLength="5" value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)} />

                              <input placeholder='Phone' value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />

                              <Link to="/profile"><button onClick={editMyUser}>Update My Info</button></Link>
                        </div>
                  </form>

            </div>
      )




}

export default ProfileEdit;
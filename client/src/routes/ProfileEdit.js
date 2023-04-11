import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileEditCss from '../css/ProfileEdit.module.css';

const ProfileEdit = () => {
  const location = useLocation();
  const propsData = location.state;
  const [email, setEmail] = useState(propsData.email);
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
      const response = await fetch(
        'https://grace-shopper-buzzed.onrender.com/api/users/user/edit',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            email: email,
            first_name: first_name,
            last_name: last_name,
            address_line1: address_line1,
            city: city,
            state: state,
            zipcode: zipcode,
            phone: phone,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={ProfileEditCss.body}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={ProfileEditCss.answerBox}>
          <div className={ProfileEditCss.input}>
            <div className={ProfileEditCss.inputColumn}>
              <input
                className={ProfileEditCss.inputBox}
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className={ProfileEditCss.inputBox}
                placeholder='First Name'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                className={ProfileEditCss.inputBox}
                placeholder='Last Name'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                className={ProfileEditCss.inputBox}
                placeholder='Address'
                value={address_line1}
                onChange={(e) => setAddress1(e.target.value)}
              />
            </div>
            <div className={ProfileEditCss.inputColumn}>
              <input
                className={ProfileEditCss.inputBox}
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                className={ProfileEditCss.inputBox}
                placeholder='State Code'
                type='text'
                maxLength='2'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />

              <input
                className={ProfileEditCss.inputBox}
                placeholder='Zipcode (0-9 only)'
                maxLength='5'
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />

              <input
                className={ProfileEditCss.inputBox}
                placeholder='Phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div lassName={ProfileEditCss.buttons}>
            <Link className={ProfileEditCss.buttonLink} to='/profile'>
              <button
                className={ProfileEditCss.buttonLink}
                onClick={editMyUser}
              >
                Update My Info
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;

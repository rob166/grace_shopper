import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCss from '../css/Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    async function showMyUser() {
      try {
        const response = await fetch('http://localhost:3001/api/users/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        const json = await response.json();
        setUser(json);
        //console.log(json);
      } catch (error) {
        console.error(error);
      }
    }
    showMyUser();
  }, [jwt]);

  return (
    <div className={ProfileCss.body}>
      <div className={ProfileCss.answerBox}>
        <span className={ProfileCss.answerBoxText}>Email: {user.email}</span>
        <span className={ProfileCss.answerBoxText}>
          First Name: {user.first_name}
        </span>
        <span className={ProfileCss.answerBoxText}>
          Last Name: {user.last_name}
        </span>
        <span className={ProfileCss.answerBoxText}>
          Address: {user.address_line1}
        </span>
        <span className={ProfileCss.answerBoxText}>City: {user.city}</span>
        <span className={ProfileCss.answerBoxText}>State: {user.state}</span>
        <span className={ProfileCss.answerBoxText}>
          Zipcode: {user.zipcode}
        </span>
        <span className={ProfileCss.answerBoxText}>
          Phone Number: {user.phone}
        </span>
        <div>
          <Link
            className={ProfileCss.buttonLink}
            to='/profile/edit'
            state={user}
          >
            <button className={ProfileCss.buttonLink}>
              <h3>Edit Profile</h3>
            </button>
          </Link>
        </div>
      </div>

      <button onClick={() => navigate('/user/orders')}>
        View your order history
      </button>
    </div>
  );
};

export default Profile;

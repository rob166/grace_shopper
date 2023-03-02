import React from 'react';
<<<<<<< HEAD

const Navbar = () => {
  return (
    <div>
      <nav>navbar</nav>
=======
import { Link } from 'react-router-dom';
import NavbarCss from '../css/Navbar.module.css'

const Navbar = () => {

  return (
    <div className={NavbarCss.body}>
     
        <h1 className={NavbarCss.title}>Grace Shopper buzzed</h1>
        <div className={NavbarCss.links}>
        <Link className={NavbarCss.link} to="/home">
          Home
        </Link>
        <Link className={NavbarCss.link} to="/cart">
          Cart
        </Link>
        </div>
     
>>>>>>> 04b51caef53a1223c3bc5cdd7ad6e34a4c0eec31
    </div>
  )
}

export default Navbar;
<<<<<<< HEAD
=======

>>>>>>> 04b51caef53a1223c3bc5cdd7ad6e34a4c0eec31

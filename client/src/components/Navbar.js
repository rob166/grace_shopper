// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import NavbarCss from '../css/Navbar.module.css';
import {FaShoppingCart} from 'react-icons/fa'
import {IoPersonSharp} from 'react-icons/io5'
import {RiLoginCircleFill} from 'react-icons/ri'
import {MdAdminPanelSettings} from 'react-icons/md'

const Navbar = ({quantity}) => {
const jwt = localStorage.getItem('jwt');
const cookies = new Cookies();
const admin = cookies.get('isAdmin');


  return (
    <div className={NavbarCss.body}>
     
        <h1 className={NavbarCss.title}>Grace Shopper buzzed</h1>
        <div className={NavbarCss.links}>
        <Link className={NavbarCss.link} to="/home">
          Home
        </Link>
        <Link className={NavbarCss.link} to="/products">
          Products
        </Link>
        <Link className={NavbarCss.link} to="/cart">
          {<div className={NavbarCss.cart}>
          <div className={NavbarCss.qNumDiv}>
          <p className={NavbarCss.qNum}>{quantity>0?quantity:null}</p>
          </div>
          <FaShoppingCart className={NavbarCss.cartLogo}/> 
         
          </div>}
        </Link>
        <Link className={NavbarCss.link} to="/login">
        <RiLoginCircleFill/>
        </Link>
        {jwt &&
        <> 
        <Link className={NavbarCss.link} to="/profile">
        <IoPersonSharp/>
        </Link>
        </>
        }
        {(admin === 'true') &&
        <> 
        <Link className={NavbarCss.link} to="/admin">
        <MdAdminPanelSettings/>
        </Link>
        </>
        }
        </div>
     
    </div>
  )
}

export default Navbar;
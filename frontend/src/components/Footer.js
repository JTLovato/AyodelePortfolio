import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footerline'>
        <span className='line'></span>
        <img className='footer-logo' src='images/logo.png' alt='Main Logo' />
        <span className='line'></span>
      </div>
      <div className='link-section'>
        <h1 className='italics larger bold'>Ayodele Odubela</h1>
        <div className='link-list'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/projects'>Projects</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/schedule'>Schedule</Link>
          <Link to='/store'>Store</Link>
          <Link to='/blogs'>Blogs</Link>
          <Link to='/links'>Links</Link>
        </div>
      </div>
    </div>
  );
}

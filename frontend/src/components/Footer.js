import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footerline'>
        <span className='line'></span>
        <img src='images/logo.png' alt='Main Logo' />
        <span className='line'></span>
      </div>
      <div className='link-section'>
        <h1 className='italics larger bold'>Ayodele Odubela</h1>
        <div className='link-list'>
          <Link to='/'>Home</Link>
          <Link to='/'>About</Link>
          <Link to='/'>Projects</Link>
          <Link to='/'>Talks</Link>
          <Link to='/'>Contact</Link>
          <Link to='/'>Schedule</Link>
          <Link to='/'>Store</Link>
          <Link to='/'>Media</Link>
          <Link to='/links'>Links</Link>
        </div>
      </div>
      <div className='neural-links'>
        <a href=''>
          <img src='' alt=''></img>
        </a>
        <a href=''>
          <img src='' alt=''></img>
        </a>
        <a href=''>
          <img src='' alt=''></img>
        </a>
        <a href=''>
          <img src='' alt=''></img>
        </a>
        <a href=''>
          <img src='' alt=''></img>
        </a>
        <a href=''>
          <img src='' alt=''></img>
        </a>
      </div>
    </div>
  );
}

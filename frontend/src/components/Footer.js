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
          <Link to='/blog'>Blogs</Link>
          <Link to='/links'>Links</Link>
        </div>
      </div>
      {/* <div className='neural-links'>
        <a href='' className='ai-link ai-1'>
          <img src='images/twitter_icon.png' alt='Twitter Icon'></img>
        </a>
        <span className='ai-line ai1'></span>
        <a href='' className='ai-link ai-2'>
          <img src='images/linkedin_icon.png' alt='LinkedIn Icon'></img>
        </a>
        <span className='ai-line ai2'></span>
        <a href='' className='ai-link ai-3'>
          <img src='images/tiktok_icon.png' alt='Tiktok Icon'></img>
        </a>
        <span className='ai-line ai3'></span>
        <a href='' className='ai-link ai-4'>
          <img src='images/youtube_icon.png' alt='Youtube Icon'></img>
        </a>
        <span className='ai-line ai4'></span>
        <a href='' className='ai-link ai-5'>
          <img src='images/bluesky_icon.png' alt='BlueSky Icon'></img>
        </a>
        <span className='ai-line ai5'></span>
        <a href='' className='ai-link ai-6'>
          <img src='images/email_icon.png' alt='Email Icon'></img>
        </a>
        <span className='ai-line ai6'></span>
      </div> */}
    </div>
  );
}

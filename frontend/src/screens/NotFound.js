import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='margin-holder'>
      <div className='not_found_page'>
        <div className='not_found_info'>
          <h1 className='new-font'>Oh No!</h1>
          <h4>Looks like the AI Twins K3TCHUP & MUST4RD lost a page!</h4>
          <p>Here are some helpful links:</p>
          <Link to='/'>Home</Link>
          <Link to='/blogs'>Blog</Link>
          <Link to='/contact'>Contact</Link>
        </div>
        <img src='images/lost_bots.jpg' alt='Lost Robot Toys'></img>
      </div>
    </div>
  );
}

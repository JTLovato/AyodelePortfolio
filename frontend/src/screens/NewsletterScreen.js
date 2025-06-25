import React from "react";

export default function NewsletterScreen() {
  return (
    <div className='newsletter'>
      <h1 className='italics larger underline'>Join Our Newsletter!</h1>
      <p>
        Sign up for the weekly newsletter and be among the first to hear of any
        news, videos and more!
      </p>
      <iframe
        title='newsletter'
        src='https://embeds.beehiiv.com/b7ab782e-ac0d-415c-84b0-e7704709e1c3?slim=true'
        data-test-id='beehiiv-embed'
        height='52'
        frameBorder='0'
        scrolling='no'
        className='newsletter-code'
      ></iframe>
    </div>
  );
}

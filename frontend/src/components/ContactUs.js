import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = (props) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fk0udqh",
        "template_tak3jx4",
        form.current,
        "KxxaNw4sD52kSXZ0c"
      )
      .then(
        (result) => {
          console.log("Email Sent Successfully");
        },
        (error) => {
          console.log("Something Went Wrong, Email Not Sent.");
          console.log(error.text);
        }
      );
  };

  return (
    <form className='contact-form' ref={form} onSubmit={sendEmail}>
      <label htmlFor='name'>Your Name</label>
      <input id='name' type='text' name='from_name' />

      <label htmlFor='title'>Title</label>
      <input id='title' type='text' name='title' />

      <label htmlFor='email'>Your Email</label>
      <input id='email' type='email' name='user_email' />

      <label htmlFor='message'>Your Message For Me!</label>
      <textarea id='message' name='message' />

      <input className='submit' type='submit' value='Send' />

      <div className='contact-info-holder'>
        <span className='contact-span'></span>
        <h3>Other Ways To Contact Me:</h3>
        <a href='https://www.freecodecamp.org/' target='_blank'>
          <img src="images/twitter_icon.png" alt="twitter icon" />
        </a>
        <a href='https://www.freecodecamp.org/' target='_blank'>
        <img src="images/twitter_icon.png" alt="twitter icon" />

        </a>
        <a href='https://www.freecodecamp.org/' target='_blank'>
        <img src="images/twitter_icon.png" alt="twitter icon" />

        </a>
        <a href='https://www.freecodecamp.org/' target='_blank'>
        <img src="images/twitter_icon.png" alt="twitter icon" />

        </a>
      </div>
    </form>
  );
};

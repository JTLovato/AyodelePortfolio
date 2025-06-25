import React, { useRef, useState } from "react";
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
          setBasic(false);
          setSuccess(true);
          console.log("Email Sent Successfully");
        },
        (error) => {
          setBasic(false);
          setFail(true);
          console.log("Something Went Wrong, Email Not Sent.");
          console.log(error.text);
        }
      );
  };

  const [basic, setBasic] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  return (
    <form className='contact-form' ref={form} onSubmit={sendEmail}>
      {basic && (
        <section>
          <label htmlFor='name'>Your Name</label>
          <input required id='name' type='text' name='from_name' />

          <label htmlFor='title'>Title</label>
          <input id='title' type='text' name='title' />

          <label htmlFor='email'>Your Email</label>
          <input required id='email' type='email' name='user_email' />

          <label htmlFor='message'>Your Message For Me!</label>
          <textarea required id='message' name='message' />

          <input className='submit' type='submit' value='Send' />
        </section>
      )}
      {success && (
        <section className='success'>
          <h1 className='new-font'>Thanks!</h1>
          <h2>I'll be in touch soon!</h2>
        </section>
      )}
      {fail && (
        <section className='fail'>
          <h1>Uh-oh...</h1>
          <h2>Looks like something, somewhere, went wrong.</h2>
          <h2>
            Try shooting me an <a href='mailto: aro1871@gmail.com'>Email</a>{" "}
            instead!
          </h2>
        </section>
      )}

      <div className='contact-info-holder'>
        <span className='contact-span'></span>
        <h3>Other Ways To Contact Me:</h3>
        <div className='link-icon-holder'>
          <a
            href='https://twitter.com/ayodele_odubela'
            rel='noreferrer'
            target='_blank'
          >
            <img src='images/twitter_icon.png' alt='twitter icon' />
          </a>
          <a
            href='https://www.linkedin.com/in/ayodeleodubela/'
            rel='noreferrer'
            target='_blank'
          >
            <img src='images/linkedin_icon.png' alt='twitter icon' />
          </a>
          <a href='mailto: aro1871@gmail.com' rel='noreferrer' target='_blank'>
            <img src='images/email_icon.png' alt='twitter icon' />
          </a>
          <a
            href='https://www.tiktok.com/@aiethics101'
            rel='noreferrer'
            target='_blank'
          >
            <img src='images/tiktok_icon.png' alt='twitter icon' />
          </a>
        </div>
      </div>
    </form>
  );
};

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
          console.log("YOU ALREADY KNOOOOOOW");
        },
        (error) => {
          console.log("Aw Shit Dawg, Something Went Wrong.");
          console.log(error.text);
        }
      );
  };

  return (
    <form className='contact-form' ref={form} onSubmit={sendEmail}>
      <label htmlFor='name'>Name</label>
      <input id='name' type='text' name='from_name' />

      <label htmlFor='title'>Title</label>
      <input id='title' type='text' name='title' />

      <label htmlFor='email'>Email</label>
      <input id='email' type='email' name='user_email' />

      <label htmlFor='message'>Message</label>
      <textarea id='message' name='message' />

      <input className='submit' type='submit' value='Send' />
    </form>
  );
};

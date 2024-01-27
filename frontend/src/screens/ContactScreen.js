import React from "react";
import { useLocation } from "react-router-dom";
import { ContactUs } from "../components/ContactUs";

export default function ContactScreen() {
  const location = useLocation();
  const info = location.state?.info;

  const nonInfo = "General";

  return (
    <div className='contact-holder margin-holder'>
      <h1>Got A Question?</h1>

      <div className='contact-js-holder'>
        {info ? <ContactUs session={info} /> : <ContactUs session={nonInfo} />}
        <img src='/images/envelope.png' alt='Envelope drawing'></img>
      </div>
    </div>
  );
}

import React from "react";

export default function HistoryScreen() {
  return (
    <div className='history-section'>
      <div className='history'>
        <h1>
          You may know <span className='italics bold larger'>Ayodele</span>{" "}
          from...
        </h1>
        <div className='history-holder'>
          <div className='history-image-holder'>
            <img src='images/microsoft-logo.png' alt='Microsoft Logo'></img>
          </div>
          <div className='history-image-holder'>
            <img src='images/mindbody-logo.png' alt='Mindbody Logo'></img>
          </div>
          <div className='history-image-holder'>
            <img src='images/observable-logo.png' alt='Observable Logo'></img>
          </div>
          <div className='history-image-holder'>
            <img src='images/vera-logo.png' alt='Vera Logo'></img>
          </div>
        </div>
      </div>
    </div>
  );
}

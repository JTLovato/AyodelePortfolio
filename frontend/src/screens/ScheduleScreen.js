import React from "react";
import { InlineWidget } from "react-calendly";

export default function ScheduleScreen() {
  return (
    <div className='margin-holder'>
      <InlineWidget url='https://calendly.com/ayodeleodubela' />
    </div>
  );
}

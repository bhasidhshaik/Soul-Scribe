import React from 'react'
import { useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const DatePicker = () => {
    const [selected , setSelected] = useState()
    console.log(selected.toLocaleDateString()); //Output is 12/21/2024
    
  return (
    <DayPicker
    mode="single"
    selected={selected}
    onSelect={setSelected}
    footer={
      selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
    }
  />
  )
}

export default DatePicker
import React from "react";

const ProgressBar = ({ percentage }) => {

  console.log(percentage);

  const innerBarStyle = {
    width: 5 * percentage,
  }
  
  return (
    <div id='progressBar'>
      <div id='innerBar' style={innerBarStyle}></div>
    </div>
  )
}

export default ProgressBar;
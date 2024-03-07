import React from "react";

const ProgressBar = ({ permyriad }) => {

  console.log(permyriad);

  const innerBarStyle = {
    width: `${permyriad / 100}%`,
  }
  
  return (
    <div id='progressBar'>
      <div id='innerBar' style={innerBarStyle}></div>
    </div>
  )
}

export default ProgressBar;
import React from "react";

const Results = ({ sortedList }) => {

  const resultElements = [];
  for (const item of sortedList) {
    resultElements.push(<h2 key={item}>{item}</h2>)
  }

  return (
    <div id='results'>
      <div id='items'>
        {resultElements}
      </div>
    </div>
  )
}

export default Results;
import React from "react";

const Results = ({ sortedList }) => {

  const resultElements = [];
  let itemNumber = 1;
  for (const item of sortedList) {
    resultElements.push(
      <div className='sortedItem'>
        <p>{itemNumber++}</p>
        <p key={item}>{item}</p>
      </div>
    )
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
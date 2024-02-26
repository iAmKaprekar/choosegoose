import React, {useState} from "react";

const ExistingList = ({ name, size, complete, steps, id, openList, promptDeletion }) => {
  
  const progress = (size, steps) => {
    let remaining = size - 1;
    let power = 0;
    let result = 0;
    while (remaining > 0) {
      result += (power + 1) * Math.min(2 ** power, remaining);
      remaining -= 2 ** power;
      power++;
    }
    let percentage = Math.floor((steps / result) * 100);
    return percentage < 100 ? `About ${percentage}% sorted!` : 'About 99% sorted!';
  }

  return (
    <div className='existingList'>
      <div className='listInfo'>
        <h2>{name}</h2>
        <h3>{`Items: ${size}`}</h3>
        <h3>{`Status: ${complete ? 'Sorted!' : progress(size, steps)}`}</h3>
      </div>
      <div className='listSelectionButtons'>
        <button onClick={() => openList(id)}>View List</button>
        <button onClick={promptDeletion} className="deleteButton">Delete</button>
      </div>
    </div>
  )
}

export default ExistingList;
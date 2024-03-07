import React from "react";

const ExistingList = ({ name, size, complete, permyriad, id, openList, promptDeletion }) => {
  return (
    <div className='existingList'>
      <div className='listInfo'>
        <h2>{name}</h2>
        <h3>{`Items: ${size}`}</h3>
        <h3>{`Status: ${complete ? 'Sorted!' : permyriad ? `${Math.floor(permyriad / 100)}% sorted!` : `Work in progress!`}`}</h3>
      </div>
      <div className='listSelectionButtons'>
        <button onClick={() => openList(id, size)}>View List</button>
        <button onClick={promptDeletion} className="deleteButton">Delete</button>
      </div>
    </div>
  )
}

export default ExistingList;
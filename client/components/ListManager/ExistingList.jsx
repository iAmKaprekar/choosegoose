import React from "react";

const ExistingList = ({name}) => {
  return (
    <div id='existingList'>
      <div id='listInfo'>
        <h2>{name}</h2>
        <h3>Items</h3>
        <h3>Status</h3>
      </div>
      <button>View</button>
    </div>
  )
}

export default ExistingList;
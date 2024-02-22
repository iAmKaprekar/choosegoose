import React from "react";

const ListItem = ({ name, removeSelf }) => {
  return (
    <div className='listItem'>
      <h2>{name}</h2>
      <button onClick={removeSelf}>X</button>
    </div>
  )
}

export default ListItem;
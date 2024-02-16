import React, { useState } from "react";

import ListCreator from './ListManager/ListCreator';
import ListSelector from './ListManager/ListSelector';

const ListManager = ({ setListId, goToSorting }) => {
  const [newList, setNewList] = useState(false);

  const renderedPage = newList ? 
    <ListCreator
      goToSorting={goToSorting}
    /> :
    <ListSelector 
      goToSorting={goToSorting}
    />;

  const topText = newList ? 'Your New List' : 'Your Lists';
  const buttonText = newList ? 'Go Back' : 'Create New List';

  return (
    <div id='listManager'>
      <div id='topBar'>
        <h1>{topText}</h1>
        <button onClick={() => setNewList(!newList)}>{buttonText}</button>
      </div>
      {renderedPage}
    </div>
  )
}

export default ListManager;
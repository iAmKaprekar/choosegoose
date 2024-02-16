import React, { useState } from "react";

import ListCreator from './ListManager/ListCreator';
import ListSelector from './ListManager/ListSelector';

const ListManager = ({ setListId, goToSorting }) => {
  const [newList, setNewList] = useState(false);

  const goToList = (id) => {
    setListId(id);
    goToSorting();
  }

  const initializeData = (items) => {
    const randomizedItems = items.slice();
    console.log(randomizedItems.sort(() => Math.random() > 0.5 ? 1 : -1));
    console.log(randomizedItems);
    let data = '';
    for (const item of randomizedItems) {
      if (data) data += '`';
      data += item;
    }
    return data;
  }

  const processData = (data) => {
    const state = {
      hold: [],
      mergers: [],
    };
    let item = '';
    for (const char of data) {
      if (char === '`') {
        state.hold.push([item]);
        item = '';
      } else {
        item += char;
      }
    }
    if (item) state.hold.push([item]);
    return state;
  }

  const renderedPage = newList ? 
    <ListCreator
      goToList={goToList}
      goToSorting={goToSorting}
      initializeData={initializeData}
      processData={processData}
    /> :
    <ListSelector 
      processData={processData}
      goToList={goToList}
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
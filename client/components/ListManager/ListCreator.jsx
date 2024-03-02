import React, { useState } from "react";

import { createMergers, compileData, processData, initializeData } from '../../sorting';

import ListItem from "./ListItem";

const ListCreator = ({ goToSorting, items, setItems, listName, setListName, itemName, setItemName }) => {

  const [error, setError] = useState('');

  const createList = async() => {
    const initialData = initializeData(items);
    const initialState = processData(initialData);
    const readyState = createMergers(initialState);
    const readyData = compileData(readyState);
    const creationResponse = await fetch('/api/list', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: listName,
        size: items.length,
        data: readyData,
      })
    })
    const data = await creationResponse.json();
    if (data.err) {
      return setError(data.err);
    }
    goToSorting({
      id: data.list.id,
      name: data.list.name,
      state: readyState,
      steps: 0,
      complete: false,
      size: items.length,
    });
  }

  const addItem = () => {
    if (itemName && !items.includes(itemName)) {
      const newItems = items.slice();
      newItems.push(itemName);
      setItems(newItems);
      setItemName('');
    }
  }

  const addItems = (proposedItems) => {
    const newItems = items.slice();
    for (const item of proposedItems) {
      if (item && !newItems.includes(item)) {
        newItems.push(item);
      }
    }
    setItems(newItems);
  }

  const checkItemName = (str) => {
    let newItemName = '';
    const newItems = [];
    for (const char of str) {
      if (char === '\n') {
        newItems.push(newItemName);
        newItemName = '';
      } else {
        newItemName += char; 
      }
    }
    addItems(newItems);
    setItemName(newItemName);
  }

  const removeItem = (item) => {
    const newItems = items.slice();
    newItems.splice(newItems.indexOf(item), 1);
    setItems(newItems);
  }

  const listItems = [];
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    listItems.push(<ListItem removeSelf={() => removeItem(item)} name={item} key={i}/>)
  }

  return (
    <div id='listCreator'>
      <div className='option'>
        <h2>Name of List</h2>
        <input id='name' value={listName} onChange={(e) => setListName(e.target.value)}></input>
      </div>
      <h2>Add Items</h2>
      <div className='option'>
        <textarea id='item' value={itemName} onChange={(e) => checkItemName(e.target.value)}></textarea>
        <button id='add' onClick={addItem}>+</button>
      </div>
      <div id='itemList'>
        {listItems}
      </div>
      <button onClick={createList}>Begin Sorting</button>
    </div>
  )
}

export default ListCreator;

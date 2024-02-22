import React, { useState } from "react";

import { createMergers, compileData, processData, initializeData } from '../../sorting';

import ListItem from "./ListItem";

const ListCreator = ({ goToList }) => {

  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');

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
      return console.log(data.err);
    }
    goToList(data.list.listId);
  }

  const checkKey = (e) => {
    if (e.key === 'Enter') addItem();
  }

  const addItem = () => {
    if (itemName && !items.includes(itemName)) {
      const newItems = items.slice();
      newItems.push(itemName);
      setItems(newItems);
      setItemName('');
    }
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
        <input id='item' value={itemName} onKeyDown={checkKey} onChange={(e) => setItemName(e.target.value)}></input>
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
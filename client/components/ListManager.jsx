import React, { useState, useEffect } from "react";

import ListCreator from './ListManager/ListCreator';
import ListSelector from './ListManager/ListSelector';
import DeletionConfirmation from "./ListManager/DeletionConfirmation";

const ListManager = ({ goToSorting }) => {
  const [lists, setLists] = useState([{loading: true}]);
  const [newList, setNewList] = useState(false);
  const [listToDelete, setListToDelete] = useState('');
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');

  const findLists = async() => {
    const listResponse = await fetch('/api/list');
    const listData = await listResponse.json()
    if (listData.err) console.log(listData.err);
    const sortedData = listData.lists.sort((a, b) => a.list_id - b.list_id)
    setLists(sortedData);
  }

  useEffect(() => {
    findLists();
  }, []);

  if (listToDelete) {
    return <DeletionConfirmation
      listToDelete={listToDelete}
      cancelDeletion={() => setListToDelete('')}
    />
  }

  const renderedPage = newList ? 
    <ListCreator
      items={items}
      setItems={setItems}
      listName={listName}
      setListName={setListName}
      itemName={itemName}
      setItemName={setItemName}
      goToSorting={goToSorting}
    /> :
    <ListSelector 
      lists={lists}
      setLists={setLists}
      goToSorting={goToSorting}
      setListToDelete={setListToDelete}
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
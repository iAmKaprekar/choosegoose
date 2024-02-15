import React, {useEffect, useState} from "react";

import ExistingList from "./ExistingList";

const ListSelector = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(
      [
        {name: 'Items in Binding of Isaac'},
        {name: 'Adventure Time Episodes'},
        {name: 'Best Songs of All Time'}
      ]
    );
  }, []);

  const listElements = [];

  for (const list of lists) {
    listElements.push(
      <ExistingList
        key={list.name}
        name={list.name}
        size={list.size}
        complete={list.complete}
      />
    )
  }

  return (
    <div id='listSelector'>
      <div id='topBar'>
        <h1>Your Lists</h1>
        <button>Create New List</button>
      </div>
      {listElements}
    </div>
  )
}

export default ListSelector;
import React, {useEffect, useState} from "react";

import ExistingList from "./ExistingList";

const ListSelector = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(
      [
        {
          name: 'Items in Binding of Isaac',
          size: 719,
          complete: false,
          steps: 2500,
        },
        {
          name: 'Adventure Time Episodes',
          size: 293,
          complete: false,
          steps: 2130,
        },
        {
          name: 'Best Songs of All Time',
          size: 133,
          complete: true,
          steps: 808,
        }
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
        steps={list.steps}
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
import React, { useState } from "react";

import ListCreator from './ListManager/ListCreator';
import ListSelector from './ListManager/ListSelector';

const ListManager = ({setListId}) => {
  const [newList, setNewList] = useState(false);

  const renderedPage = newList ? 
    <ListCreator
      setListid={setListId}
      switchToSelector={() => setNewList(false)}
    /> :
    <ListSelector 
      setListid={setListId}
      switchToCreator={() => setNewList(true)}
    />;

  return (
    <div id='listManager'>
      {renderedPage}
    </div>
  )
}

export default ListManager;
import React, { useState } from "react";

import ListCreator from './ListManager/ListCreator';
import ListSelector from './ListManager/ListSelector';

const ListManager = () => {
  const [newList, setNewList] = useState(false);

  const renderedPage = newList ? <ListCreator /> : <ListSelector />;

  return (
    <div id='listManager'>
      <h1>ListManager</h1>
      {renderedPage}
    </div>
  )
}

export default ListManager;
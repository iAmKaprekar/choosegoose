import React, {useEffect, useState} from "react";

import ExistingList from "./ExistingList";
import Loading from "../Loading";

const ListSelector = ({ goToList }) => {
  const [lists, setLists] = useState([{loading: true}]);

  const findLists = async() => {
    const listResponse = await fetch('/api/list');
    const listData = await listResponse.json()
    listData.err ? console.log(listData.err) : setLists(listData.lists)
  }

  const openList = async(id) => {
    const listResponse = await fetch(`/api/list/${id}`);
    goToList();
  }

  useEffect(() => {
    findLists();
  }, []);

  const listElements = [];

  for (let i = lists.length - 1; i >= 0; i--) {
    const list = lists[i];
    const {id, name, size, complete, steps} = list;
    listElements.push(
      <ExistingList
        key={i}
        name={name}
        size={size}
        complete={complete}
        steps={steps}
        id={id}
        openList={openList}
      />
    )
  }

  if (lists[0]?.loading) {
    listElements[0] = <Loading key={0}/>;
  }

  return (
    <div id='listSelector'>
      {listElements[0] ? listElements : <p>You currently have no lists. Create a new list by clicking the button above!</p>}
    </div>
  )
}

export default ListSelector;
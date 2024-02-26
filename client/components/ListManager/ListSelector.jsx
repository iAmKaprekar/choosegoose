import React, {useEffect, useState} from "react";

import { processData } from "../../sorting";

import ExistingList from "./ExistingList";
import Loading from "../Loading";

const ListSelector = ({ goToSorting, lists, setListToDelete }) => {

  const openList = async(id) => {
    const listResponse = await fetch(`/api/list/${id}`);
    const data = await listResponse.json();
    const loadedState = processData(data.list.data);
    goToSorting({
      id: id,
      name: data.list.name,
      state: loadedState,
      steps: data.list.steps,
      complete: data.list.complete === '1',
    });
  }

  const listElements = [];

  for (let i = lists.length - 1; i >= 0; i--) {
    const list = lists[i];
    const {list_id, name, size, complete, steps} = list;
    listElements.push(
      <ExistingList
        key={i}
        name={name}
        size={size}
        complete={complete}
        steps={steps}
        id={list_id}
        openList={openList}
        promptDeletion={() => setListToDelete(name)}
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
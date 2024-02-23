import React, { useState } from "react";

import {compileData, createMergers, determineCompletion, generateQuestion, handleAnswer} from '../sorting';

import Question from './Sorting/Question';
import Results from './Sorting/Results';

const Sorting = ({ listId, setListId, goToListManager, complete, setComplete, steps, setSteps, sortingState, setSortingState, listName }) => {

  const [saving, setSaving] = useState(false);

  const saveDataRequest = async(data) => {
    setSaving(true);
    // const saveDataResponse = await fetch(
    //   `/api/list/${listId}`,
    //   {
    //     method: 'PATCH',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //       complete: complete,
    //       steps: steps,
    //       data: data
    //     })
    //   }
    // )
    // if (saveDataResponse.ok) {
    //   setSaving(false);
    // }
    console.log('Saved or something')
    setSaving(false);
  }

  const sendAnswer = (payload) => {
    const answeredState = handleAnswer(sortingState, payload);
    const newState = createMergers(answeredState);
    setSortingState(newState);
    console.log(newState);
    setSteps(steps + 1);
    const isComplete = determineCompletion(newState);
    const data = compileData(newState);
    saveDataRequest(data);
    if (isComplete) {
      setComplete(true);
    } else {
      return generateQuestion(newState);
    }
  }

  const renderedPage = complete ? 
    <Results
    
    /> : 
    <Question
      sortingState={sortingState}
      sendAnswer={sendAnswer}
      saving={saving}
    />;

  return (
    <div id='sorting'>
      <h1>Sorting</h1>
      {renderedPage}
    </div>
  )
}

export default Sorting;
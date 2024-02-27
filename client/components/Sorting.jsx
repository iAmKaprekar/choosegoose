import React, { useState } from "react";

import {compileData, createMergers, determineCompletion, generateQuestion, handleAnswer, progressPercentage} from '../sorting';

import Question from './Sorting/Question';
import Results from './Sorting/Results';
import ProgressBar from './Sorting/ProgressBar';

const Sorting = ({ listId, setListId, goToListManager, complete, setComplete, steps, setSteps, sortingState, setSortingState, listName, size }) => {

  const [saving, setSaving] = useState(false);

  const goBack = () => {
    if (!saving) {
      setListId(null);
      goToListManager();
    }
  }

  const saveDataRequest = async(data, steps, complete) => {
    setSaving(true);
    const saveDataResponse = await fetch(
      `/api/list/${listId}`,
      {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          complete: complete,
          steps: steps,
          data: data,
          name: listName,
        })
      }
    )
    if (saveDataResponse.ok) {
      setSaving(false);
    }
  }

  const sendAnswer = (payload) => {
    const answeredState = handleAnswer(sortingState, payload);
    const newState = createMergers(answeredState);
    setSortingState(newState);
    const newSteps = steps + 1;
    setSteps(newSteps);
    const isComplete = determineCompletion(newState);
    const data = compileData(newState);
    saveDataRequest(data, newSteps, isComplete);
    if (isComplete) {
      setComplete(true);
    } else {
      return generateQuestion(newState);
    }
  }

  const renderedPage = complete ? 
    <Results
      sortedList={sortingState.hold[0]}
    /> : 
    <Question
      sortingState={sortingState}
      sendAnswer={sendAnswer}
      saving={saving}
    />;
  
  const progressBar = !complete ?
    <ProgressBar
      percentage={progressPercentage(size, steps)}
    /> :
    <></>;

  return (
    <div id='sorting'>
      <div id='topBar'>
        <h1>{listName}</h1>
        <button onClick={goBack}>Go Back</button>
      </div>
      {renderedPage}
      {progressBar}
    </div>
  )
}

export default Sorting;
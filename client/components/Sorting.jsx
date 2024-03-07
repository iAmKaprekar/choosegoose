import React, { useState } from "react";

import {compileData, createMergers, determineCompletion, generateQuestion, handleAnswer, progressPermyriad} from '../sorting';

import Question from './Sorting/Question';
import Results from './Sorting/Results';
import ProgressBar from './Sorting/ProgressBar';

const Sorting = ({ listId, setListId, goToListManager, complete, setComplete, steps, setSteps, sortingState, setSortingState, listName, size }) => {

  const [saving, setSaving] = useState(false);
  const [savedState, setSavedState] = useState(null);

  const goBack = () => {
    if (!saving) {
      setListId(null);
      goToListManager();
    }
  }

  const saveDataRequest = async(data, steps, complete, progress) => {
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
          progress: progress
        })
      }
    )
    if (saveDataResponse.ok) {
      setSaving(false);
    }
  }

  const sendAnswer = (payload, oldChoices) => {
    const answeredState = handleAnswer(sortingState, payload);
    const newState = createMergers(answeredState);
    const newSteps = steps + 1;
    const isComplete = determineCompletion(newState);
    const data = compileData(newState);
    const progress = progressPermyriad(size, newState);
    setSavedState(sortingState);
    setSortingState(newState);
    setSteps(newSteps);
    saveDataRequest(data, newSteps, isComplete, progress);
    if (isComplete) {
      setComplete(true);
    } else {
      for (let i = 0; i < 3; i++) {
        const proposedQuestion = generateQuestion(newState);
        if (
          !oldChoices[proposedQuestion.leftItem] && 
          !oldChoices[proposedQuestion.rightItem]
        ) return proposedQuestion;
      }
      return generateQuestion(newState);
    }
  }

  const revokeAnswer = () => {
    const data = compileData(savedState);
    const newSteps = steps - 1;
    setSteps(newSteps);
    setSortingState(savedState);
    saveDataRequest(data, newSteps, false);
  }

  const renderedPage = complete ? 
    <Results
      sortedList={sortingState.hold[0]}
    /> : 
    <Question
      sortingState={sortingState}
      sendAnswer={sendAnswer}
      saving={saving}
      revokeAnswer={revokeAnswer}
    />;
  
  const progressBar = !complete ?
    <ProgressBar
      permyriad={progressPermyriad(size, sortingState)}
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
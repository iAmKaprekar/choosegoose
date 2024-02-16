import React from "react";

import {compileData, createMergers, determineCompletion, generateQuestion, handleAnswer} from '../sorting';

import Question from './Sorting/Question';
import Results from './Sorting/Results';

const Sorting = ({ listId, setListId, goToListManager, complete, setComplete, steps, setSteps, sortingState, setSortingState, listName }) => {

  const renderedPage = complete ? <Results/> : <Question/>;

  return (
    <div id='sorting'>
      <h1>Sorting</h1>
      {renderedPage}
    </div>
  )
}

export default Sorting;
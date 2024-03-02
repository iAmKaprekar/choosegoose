import React, { useState, useEffect } from 'react';

import { generateQuestion } from '../../sorting';

import Loading from '../Loading';

const Question = ({ sortingState, sendAnswer, saving, revokeAnswer }) => {

  const [question, setQuestion] = useState(null);
  const [choices, setChoices] = useState(<Loading />);
  const [previousQuestion, setPreviousQuestion] = useState(null);

  const generateButtons = () => {
    if (!question) setChoices(<Loading />);
    else if (Math.random() > 0.5) {
      setChoices(
        <div id='choices'>
          <button onClick={() => prepareAnswer('left')} id='choiceButton'>{question.leftItem}</button>
          <button onClick={() => prepareAnswer('right')} id='choiceButton'>{question.rightItem}</button>
        </div>
      );
    } else {
      setChoices(
        <div id='choices'>
          <button onClick={() => prepareAnswer('right')} id='choiceButton'>{question.rightItem}</button>
          <button onClick={() => prepareAnswer('left')} id='choiceButton'>{question.leftItem}</button>
        </div>
      );
    }
  }

  const prepareAnswer = (choice) => {
    const oldChoices = {};
    oldChoices[question.leftItem] = true;
    oldChoices[question.rightItem] = true;
    const newQuestion = sendAnswer({
      choice: choice,
      mergerIndex: question.mergerIndex,
      direction: question.direction,
    }, oldChoices)
    if (newQuestion) {
      setPreviousQuestion(question);
      setQuestion(newQuestion);
    }
  }

  const undoAnswer = () => {
    setQuestion(previousQuestion);
    setPreviousQuestion(null);
    revokeAnswer();
  }

  useEffect(() => {
    const newQuestion = generateQuestion(sortingState);
    setQuestion(newQuestion);
  }, []);

  useEffect(generateButtons, [question]);

  let previousButton;
  previousButton = previousQuestion ? <button onClick={undoAnswer} id='previousButton'>Revisit previous question</button> : <></>;

  return (
    <div id='question'>
      <h2>Which item ranks higher?</h2>
      {choices}
      <div id='stateRow'>
        <i><h4>{saving ? 'Saving progress...' : 'Saved!'}</h4></i>
        {previousButton}
      </div>
    </div>
  )
}

export default Question;
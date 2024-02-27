import React, { useState, useEffect } from 'react';

import { generateQuestion } from '../../sorting';

import Loading from '../Loading';

const Question = ({ sortingState, sendAnswer, saving }) => {

  const [question, setQuestion] = useState(null);
  const [choices, setChoices] = useState(<Loading />);

  const generateButtons = () => {
    if (!question) setChoices(<Loading />);
    else if (Math.random() > 0.5) {
      setChoices(
        <div id='choices'>
          <button onClick={() => prepareAnswer('left')}>{question.leftItem}</button>
          <button onClick={() => prepareAnswer('right')}>{question.rightItem}</button>
        </div>
      );
    } else {
      setChoices(
        <div id='choices'>
          <button onClick={() => prepareAnswer('right')}>{question.rightItem}</button>
          <button onClick={() => prepareAnswer('left')}>{question.leftItem}</button>
        </div>
      );
    }
  }

  const prepareAnswer = (choice) => {
    const newQuestion = sendAnswer({
      choice: choice,
      mergerIndex: question.mergerIndex,
      direction: question.direction,
    })
    if (newQuestion) setQuestion(newQuestion);
  }

  useEffect(() => {
    const newQuestion = generateQuestion(sortingState);
    setQuestion(newQuestion);
  }, []);

  useEffect(generateButtons, [question]);

  return (
    <div id='question'>
      <h2>Which item ranks higher?</h2>
      {choices}
      <i><h4>{saving ? 'Saving progress...' : 'Saved!'}</h4></i>
    </div>
  )
}

export default Question;
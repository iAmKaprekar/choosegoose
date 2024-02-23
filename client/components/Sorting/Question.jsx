import React, { useState, useEffect } from "react";

import { generateQuestion } from "../../sorting";

import Loading from '../Loading';

const Question = ({ sortingState, sendAnswer, saving }) => {

  const [question, setQuestion] = useState(null);
  console.log(question);

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

  if (!question) {
    return <Loading />;
  }

  let choices;

  if (Math.random() > 0.5) {
    choices = (
      <div>
        <button onClick={() => prepareAnswer('left')}>{question.leftItem}</button>
        <button onClick={() => prepareAnswer('right')}>{question.rightItem}</button>
      </div>
    );
  } else {
    choices = (
      <div>
        <button onClick={() => prepareAnswer('right')}>{question.rightItem}</button>
        <button onClick={() => prepareAnswer('left')}>{question.leftItem}</button>
      </div>
    );
  }

  return (
    <div id='question'>
      <h1>Question</h1>
      {choices}
      <h2>{saving ? 'Saving progress...' : 'Saved!'}</h2>
    </div>
  )
}

export default Question;
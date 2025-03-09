import React from 'react';

const Score = ({ score }) => {
  return (
    <div>
      <h3>Score</h3>
      <p>Correct: {score.correct}</p>
      <p>Incorrect: {score.incorrect}</p>
    </div>
  );
};

export default Score;

import React from 'react';

const PlayAgain = ({ onPlayAgain }) => {
  return (
    <div>
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default PlayAgain;

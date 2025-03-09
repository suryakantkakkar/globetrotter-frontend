import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  return <Confetti width={window.innerWidth} height={window.innerHeight} />;
};

export default ConfettiComponent;

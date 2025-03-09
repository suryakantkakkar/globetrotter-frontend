import React from 'react';

const Destination = ({ cityData, options, onAnswer }) => {
  // Destructure cityData to get clues and country
  const { clues, country } = cityData || {}; // Fallback to empty object if cityData is undefined

  // If clues or cityData is undefined, display a loading message or nothing
  if (!cityData || !clues) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Clue for a destination in {country}</h2>
      <p>{clues[0]}</p> {/* Display first clue */}
      
      {/* Display buttons for possible answers */}
      {options.map((option, index) => (
        <button key={index} onClick={() => onAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Destination;

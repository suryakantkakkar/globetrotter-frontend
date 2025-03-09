import React, { useState, useEffect } from "react";
import Destination from "./Destination";
import Confetti from "react-confetti";
import "../styles/Game.css";


const Game = ({ userName }) => {
  const [cityData, setCityData] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [funFact, setFunFact] = useState("");

  // Fetch random destination from backend
  useEffect(() => {
    fetchNewDestination();
  }, []);

  const fetchNewDestination = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/destinations/random");
      const data = await response.json();
      setCityData(data);
      setOptions([data.city, "New York", "Paris", "London"]); // Example options
      setFunFact(data.funFact); // Assume backend provides a fun fact
      setIsCorrect(null); // Reset answer state
    } catch (error) {
      console.error("Error fetching destination data:", error);
    }
  };

  // Handle answer selection
  const handleAnswer = (selectedCity) => {
    const isAnswerCorrect = selectedCity === cityData.city;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    updateScoreInDB(userName, isAnswerCorrect ? score + 1 : score);
  };

  // Function to update the score in the database
  const updateScoreInDB = async (username, newScore) => {
    try {
      await fetch(`http://localhost:5000/api/users/${username}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: newScore }),
      });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  if (!cityData) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Destination Quiz</h1>
  
      {isCorrect === true && <Confetti />}
  
      <Destination cityData={cityData} options={options} onAnswer={handleAnswer} />
  
      {isCorrect !== null && (
        <div>
          <h2 className={isCorrect ? "correct" : "incorrect"}>
            {isCorrect ? "🎉 Correct Answer!" : "😢 Incorrect Answer."}
          </h2>
          <p className="fun-fact">Fun Fact: {funFact}</p>
          <button onClick={fetchNewDestination}>Next Question</button>
        </div>
      )}
  
      <p className="score">Your score: {score}</p>
    </div>
  );
  
};

export default Game;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Game from './components/Game';
import ChallengeFriend from './components/ChallengeFriend';
import "../src/styles/App.css";

function App() {
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [userScore, setUserScore] = useState(null);
  const [inviteeScore, setInviteeScore] = useState(null); // Separate state for invitee score
  const [errorMessage, setErrorMessage] = useState('');
  const [inviteeName, setInviteeName] = useState(null);

  // Extract invitee from URL when the component mounts
  useEffect(() => {
    const path = window.location.pathname;
    const invitee = path.split('/')[2]; // Extract invitee name from URL
    if (invitee) {
      setInviteeName(invitee);
      fetchInviteeScore(invitee); // Fetch invitee score
    }
  }, []);

  // Function to register user and fetch their score
  const handleRegister = () => {
    if (username) {
      axios.post('http://localhost:5000/api/users/register', { username })
        .then((response) => {
          if (response.data.success) {
            setIsRegistered(true);
            fetchUserScore(username); 
          } else {
            setErrorMessage('User registration failed.');
          }
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          setErrorMessage('User Already registered');
        });
    }
  };

  // Function to handle "Play Again"
  const handlePlayAgain = () => {
    fetchUserScore(username);
  };

  // Fetch the user's score after registration
  const fetchUserScore = (user = username) => {
    axios.get(`http://localhost:5000/api/users/${user}`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
  
        if (response.data.success) {
          setUserScore(response.data.score);
          setIsRegistered(true);
          setErrorMessage('');
        } else {
          setIsRegistered(false);
          setErrorMessage('User not registered. Please register first.');
        }
      })
      .catch((error) => {
        console.error('Error fetching user score:', error);
        setIsRegistered(false);
        setErrorMessage('Error fetching user score.');
      });
  };

  // Fetch invitee score when invitee is found
  const fetchInviteeScore = (invitee = inviteeName) => {
    axios.get(`http://localhost:5000/api/users/${invitee}`)
      .then((response) => {
        console.log("Invitee API Response:", response.data); // Debugging log
  
        if (response.data.success) {
          setInviteeScore(response.data.score);
        } else {
          setInviteeScore(null); // Handle case when invitee doesn't exist
          setErrorMessage('Invitee not found or score unavailable.');
        }
      })
      .catch((error) => {
        console.error('Error fetching invitee score:', error);
        setInviteeScore(null);
        setErrorMessage('Error fetching invitee score.');
      });
  };

  return (
    <div>
      {!isRegistered ? (
        <div>
          <h2>Enter your username to start the game:</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handlePlayAgain}>Play Again</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/* Show invitee's score if invitee exists */}
          {inviteeName && (
            <div>
              <h3>Your friend {inviteeName} has invited you to break his Score: {inviteeScore !== null ? inviteeScore : 'Loading...'}</h3>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Your Score: {userScore !== null ? userScore : 'Loading...'}</h2>
          <Game userName={username} />
          <ChallengeFriend userName={username} />
        </div>
      )}
    </div>
  );
}

export default App;

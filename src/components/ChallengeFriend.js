import React from 'react';

const ChallengeFriend = ({ userName }) => {
  const inviteLink = `${process.env.REACT_APP_API_URL}invite/${userName}`;

  const handleShare = () => {
    const shareData = {
      title: 'Challenge a Friend',
      text: `Hey, join me in a fun destination quiz game! Check out my score and play against me: ${inviteLink}`,
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert('Sharing is not supported on this device');
    }
  };

  return (
    <div>
      <button onClick={handleShare}>Challenge a Friend</button>
    </div>
  );
};

export default ChallengeFriend;

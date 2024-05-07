import React from 'react';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <>
      <h2 className="title mt-3">Congratulations! Donation is successful.</h2>
      <div className="title">
        <Link to="/">Go back to homepage.</Link>
      </div>
      <Confetti width={screen.availWidth} height={screen.availHeight} />
    </>
  );
};

export default Success;

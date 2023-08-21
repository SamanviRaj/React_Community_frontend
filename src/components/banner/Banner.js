import React from 'react';
import Typical from 'react-typical';

const steps = [
  'Hello 👋', 2000,
  'We can track expenses for a Group !! wherever you are ! ', 3000,
  'We can split expenses among Group 👌', 3500,
  'we can read your bills ', 4000,
  'Let\'s Get Started !!',3500
];

// style={{ backgroundImage: 'url("/left_section.jpg")' }}

const Banner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" >
      <div className="text-center">
        <div className="text-4xl font-bold mb-4 text-blue-700">Welcome to Split-Share</div>
        <div className="text-2xl">
          <Typical wrapper="span" steps={steps} loop={10} className="caca" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

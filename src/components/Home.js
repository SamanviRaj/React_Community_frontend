import React from 'react';
import Banner from './banner/Banner';
import SignIn from './signin/SignIn';

const Home = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Left Section - Banner */}
      <div className="w-2/3 bg-gray-100 p-8"> {/* Apply the background color class here */}
        <Banner />
      </div>

      {/* Right Section - Sign In */}
      <div className="w-1/3 p-8">
        <div className="flex justify-center items-center h-full">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Home;

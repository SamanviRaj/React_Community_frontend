import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ setUserSignedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user authentication and navigate to sign-in page
    setUserSignedIn(false);
    navigate('/app.js');
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};

export default SignOut;

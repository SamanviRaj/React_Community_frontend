import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';


const Header = () => {
  const { userSignedIn, signOut } = useAuth(); // Use the useAuth hook

  return (
    <header className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Invoice App
        </Link>
        {userSignedIn && (
          <button
            onClick={signOut} // Call the signOut function
            className="text-white hover:underline cursor-pointer"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

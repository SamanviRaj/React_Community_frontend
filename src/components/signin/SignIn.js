import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import apiClient from '../apiclient/apiClient';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/api/signin', { username, password });

      console.log('Sign-in successful:', response.data);

      // Redirect to Invoice component using navigate
      navigate('/invoice');
    } catch (error) {
      console.error('Sign-in failed:', error);
      // Handle sign-in error here
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto w-2/5 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-semibold">Username</label>
            <input
              type="text"
              id="username"
              className="border p-2 w-full"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              className="border p-2 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign In
            </button>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createApiClient from '../apiclient/apiClient';

const SignIn = ({ useMicroserviceA, setUserSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  console.log("useMicroserviceA ... "+useMicroserviceA);
  console.log("setUserSignedIn ... "+setUserSignedIn);

  const baseUrl = useMicroserviceA ? 'http://localhost:9012' : 'http://localhost:9014';
  const apiClient = createApiClient(baseUrl);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/api/v1/users/signin', {
        email,
        password,
      });

      console.log('Sign-in successful:', response.data);

      // Update sign-in state to trigger dynamic rendering
      setUserSignedIn(true);

      // Redirect to Invoice component using navigate
      navigate('/invoice');
    } catch (error) {
      console.error('Sign-in failed:', error);
      // Handle sign-in error here
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border rounded p-2 w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border rounded p-2 w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
